import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import crypto from "crypto";
import os from "os";
import {
  BandwidthData,
  ComprehensiveTestResult,
  PacketLossTestRequest,
  PacketLossTestResponse,
  PingResult,
  SpeedMetrics,
  SystemInfo,
  UploadResult,
  WebSocketMessage,
} from "./types/type";

// Express app setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e7, // 10MB - Allow larger payloads
});

app.use(express.json());
app.use(express.raw({ limit: "100mb", type: "application/octet-stream" }));

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Utility functions
const generateTestData = (size: number): Buffer => {
  return crypto.randomBytes(size);
};

// Download speed test endpoint
app.get("/download/:size", (req: Request, res: Response): void => {
  const size: number = parseInt(req.params.size) || 1024 * 1024; // Default 1MB
  const maxSize: number = 100 * 1024 * 1024; // 100MB limit

  if (size > maxSize) {
    res.status(400).json({ error: "Size too large, max 100MB" });
    return;
  }

  const data: Buffer = generateTestData(size);

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Length", size.toString());
  res.setHeader("X-Test-Size", size.toString());
  res.setHeader("X-Start-Time", Date.now().toString());

  res.send(data);
});

// Upload speed test endpoint - DEPRECATED in favor of WebSocket-based test
app.post("/upload", (req: Request, res: Response): void => {
  const startTime: number = Date.now();
  const uploadSize: number = req.body.length;
  const endTime: number = Date.now();
  const duration: number = endTime - startTime;

  const result: UploadResult = {
    uploadSize,
    duration,
    speedMbps: (uploadSize * 8) / (duration * 1000), // Convert to Mbps
    timestamp: new Date().toISOString(),
  };

  res.json(result);
});

// Ping/Latency test endpoint
app.get("/ping", (req: Request, res: Response): void => {
  const timestamp: number = Date.now();
  res.json({
    timestamp,
    server_time: new Date().toISOString(),
    pong: true,
  });
});

// Advanced latency test with multiple samples
app.get("/latency-test", (req: Request, res: Response): void => {
  const samples: number = parseInt(req.query.samples as string) || 10;
  const interval: number = parseInt(req.query.interval as string) || 1000; // ms between pings

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  let currentSample: number = 0;
  const latencies: number[] = [];

  const sendPing = (): void => {
    if (currentSample >= samples) {
      // Calculate statistics
      const avgLatency: number =
        latencies.reduce((a, b) => a + b, 0) / latencies.length;
      const minLatency: number = Math.min(...latencies);
      const maxLatency: number = Math.max(...latencies);
      const packetLoss: number = ((samples - latencies.length) / samples) * 100;

      res.write(
        `data: ${JSON.stringify({
          type: "complete",
          statistics: {
            avgLatency: avgLatency.toFixed(2),
            minLatency,
            maxLatency,
            packetLoss: packetLoss.toFixed(2),
            totalSamples: samples,
            successfulSamples: latencies.length,
            lostPackets: samples - latencies.length,
          },
          rawData: latencies,
        })}\n\n`
      );
      res.end();
      return;
    }

    const pingStart: number = Date.now();
    res.write(
      `data: ${JSON.stringify({
        type: "ping",
        sequence: currentSample,
        timestamp: pingStart,
      })}\n\n`
    );

    // Simulate response time (in real implementation, this would be measured by client)
    const responseTime: number = Date.now() - pingStart;
    latencies.push(responseTime);

    currentSample++;
    setTimeout(sendPing, interval);
  };

  sendPing();
});

// Packet loss test endpoint
app.post("/packet-loss-test", (req: Request, res: Response): void => {
  const { sequences, timeout = 5000 }: PacketLossTestRequest = req.body;

  if (!sequences || !Array.isArray(sequences)) {
    res.status(400).json({ error: "sequences array required" });
    return;
  }

  // Store received sequences for packet loss calculation
  const receivedSequences = new Set<number>();

  sequences.forEach((seq: number) => {
    receivedSequences.add(seq);
  });

  const totalPackets: number = sequences.length;
  const receivedPackets: number = receivedSequences.size;
  const lostPackets: number = totalPackets - receivedPackets;
  const packetLossPercentage: number = (lostPackets / totalPackets) * 100;

  const result: PacketLossTestResponse = {
    totalPackets,
    receivedPackets,
    lostPackets,
    packetLossPercentage: packetLossPercentage.toFixed(2),
    receivedSequences: Array.from(receivedSequences).sort((a, b) => a - b),
    timestamp: new Date().toISOString(),
  };

  res.json(result);
});

// Advanced network diagnostics via WebSocket
io.on("connection", (socket: Socket) => {
  console.log("Socket.IO client connected:", socket.id);

  let pingTimes: PingResult[] = [];
  let packetSequences: number[] = [];
  let expectedSequences: number[] = [];
  let testStartTime: number;
  let uploadData = {
    startTime: 0,
    totalBytes: 0,
  };
  let downloadSpeed = 0;

  socket.on(
    "start_all_tests",
    (data: { duration?: number; interval?: number }) => {
      // This test orchestrates a full network analysis including latency, jitter,
      // packet loss, and download/upload speeds.

      // 1. Start latency/jitter/packet loss test
      console.log("Starting comprehensive network test...");
      pingTimes = [];
      packetSequences = [];
      expectedSequences = [];
      testStartTime = Date.now();
      const testDuration: number = data?.duration || 5000; // 5 seconds for latency
      const pingInterval: number = data?.interval || 100;
      let sequence: number = 0;
      const expectedPackets: number = Math.floor(testDuration / pingInterval);
      for (let i = 0; i < expectedPackets; i++) {
        expectedSequences.push(i);
      }
      const latencyInterval = setInterval(() => {
        if (Date.now() - testStartTime >= testDuration) {
          clearInterval(latencyInterval);

          // 2. Start Download Test after latency test is complete
          console.log("Latency test complete. Starting download test...");
          socket.emit("start_download_test");
          const downloadData = generateTestData(10 * 1024 * 1024); // 10MB
          const chunkSize = 1024 * 1024; // 1MB chunks
          let offset = 0;

          const sendChunk = () => {
            if (offset < downloadData.length) {
              const chunk = downloadData.slice(offset, offset + chunkSize);
              console.log(
                `Sending chunk: offset=${offset}, size=${chunk.length}`
              );
              socket.emit("download_chunk", chunk, () => {
                console.log(`Chunk acknowledged: offset=${offset}`);
                offset += chunkSize;
                sendChunk(); // Send next chunk after acknowledgment
              });
            } else {
              socket.emit("end_download_test");
              console.log("All download chunks sent.");
            }
          };
          console.log("Starting chunked download...");
          sendChunk();
          return;
        }
        socket.emit("diagnostic_ping", {
          type: "diagnostic_ping",
          timestamp: Date.now(),
          sequence: sequence++,
          test_start: testStartTime,
        });
      }, pingInterval);
    }
  );

  socket.on(
    "diagnostic_pong",
    (data: { original_timestamp: number; sequence: number }) => {
      const rtt: number = Date.now() - (data.original_timestamp || 0);
      pingTimes.push({
        sequence: data.sequence || 0,
        rtt: rtt,
        timestamp: Date.now(),
      });
      packetSequences.push(data.sequence || 0);
    }
  );

  socket.on("download_test_result", (data: { speed: number }) => {
    downloadSpeed = data.speed ?? 0;
    console.log(`Download speed recorded: ${downloadSpeed} Mbps`);

    // 3. Start Upload Test after receiving download speed from the client
    console.log("Starting upload test...");
    socket.emit("start_upload_test");
    uploadData = {
      startTime: Date.now(),
      totalBytes: 0,
    };
  });

  socket.on("upload_chunk", (chunk: Buffer) => {
    uploadData.totalBytes += chunk.length;
  });

  socket.on("end_upload_test", () => {
    const uploadDuration = (Date.now() - uploadData.startTime) / 1000; // in seconds
    const uploadSpeed =
      (uploadData.totalBytes * 8) / (uploadDuration * 1000 * 1000); // in Mbps
    console.log(`Upload test complete. Speed: ${uploadSpeed.toFixed(2)} Mbps`);

    const downloadSpeedMetrics = {
      speed: downloadSpeed,
      unit: "Mbps" as const,
    };
    const uploadSpeedMetrics = {
      speed: parseFloat(uploadSpeed.toFixed(2)),
      unit: "Mbps" as const,
    };

    // 4. Calculate and send final comprehensive results
    console.log("Calculating and sending final results...");
    calculateComprehensiveResults(downloadSpeedMetrics, uploadSpeedMetrics);
  });

  const calculateComprehensiveResults = (
    downloadSpeed?: SpeedMetrics,
    uploadSpeed?: SpeedMetrics
  ) => {
    // Calculate packet loss
    const expectedCount: number = expectedSequences.length;
    const receivedCount: number = packetSequences.length;
    const lostCount: number = expectedCount - receivedCount;
    const packetLoss: number =
      lostCount > 0 ? (lostCount / expectedCount) * 100 : 0;

    // Find missing sequences
    const receivedSet = new Set(packetSequences);
    const missingSequences: number[] = expectedSequences.filter(
      (seq) => !receivedSet.has(seq)
    );

    // Calculate latency statistics
    const rtts: number[] = pingTimes.map((p) => p.rtt);
    const avgLatency: number =
      rtts.length > 0 ? rtts.reduce((a, b) => a + b, 0) / rtts.length : 0;
    const minLatency: number = rtts.length > 0 ? Math.min(...rtts) : 0;
    const maxLatency: number = rtts.length > 0 ? Math.max(...rtts) : 0;

    // Calculate jitter
    const latencyVariations: number[] = rtts.map((rtt) =>
      Math.abs(rtt - avgLatency)
    );
    const jitter: number =
      latencyVariations.length > 0
        ? latencyVariations.reduce((a, b) => a + b, 0) /
          latencyVariations.length
        : 0;

    const result: ComprehensiveTestResult = {
      packetLoss: {
        percentage: packetLoss.toFixed(2),
        expected: expectedCount,
        received: receivedCount,
        lost: lostCount,
        missingSequences: missingSequences.slice(0, 10), // First 10 missing
      },
      latency: {
        avg: avgLatency.toFixed(2),
        min: minLatency,
        max: maxLatency,
        samples: rtts.length,
      },
      jitter: {
        value: jitter.toFixed(2),
        unit: "ms",
      },
      downloadSpeed,
      uploadSpeed,
      testDuration: Date.now() - testStartTime,
      rawData: {
        latencies: rtts,
        sequences: packetSequences,
      },
    };

    socket.emit("comprehensive_test_result", result);
  };

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
    //  if (reason === "io server disconnect") {
    //    socket.connect(); // Reconnect if server-initiated
    //  }
  });
});

// Bandwidth monitoring endpoint
app.get("/bandwidth-monitor", (req: Request, res: Response): void => {
  const duration: number = parseInt(req.query.duration as string) || 10; // seconds
  const interval: number = parseInt(req.query.interval as string) || 1000; // ms

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  const startTime: number = Date.now();
  let totalBytes: number = 0;

  const sendData = (): void => {
    const currentTime: number = Date.now();
    const elapsed: number = (currentTime - startTime) / 1000;

    if (elapsed >= duration) {
      const completeData: BandwidthData = {
        type: "complete",
        totalBytes,
        duration: elapsed,
        avgBandwidth: (totalBytes * 8) / (elapsed * 1000000), // Mbps
      };

      res.write(`data: ${JSON.stringify(completeData)}\n\n`);
      res.end();
      return;
    }

    const chunkSize: number = 8192; // 8KB chunks
    const chunk: Buffer = generateTestData(chunkSize);
    totalBytes += chunkSize;

    const progressData: BandwidthData = {
      type: "progress",
      bytes: totalBytes,
      elapsed,
      currentBandwidth: (totalBytes * 8) / (elapsed * 1000000), // Mbps
    };

    res.write(`data: ${JSON.stringify(progressData)}\n\n`);

    setTimeout(sendData, interval);
  };

  sendData();
});

// System info endpoint
app.get("/system-info", (req: Request, res: Response): void => {
  const systemInfo: SystemInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
    },
    uptime: os.uptime(),
    loadavg: os.loadavg(),
    networkInterfaces: os.networkInterfaces(),
  };

  res.json(systemInfo);
});

// Health check
app.get("/health", (req: Request, res: Response): void => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint with API documentation
app.get("/", (req: Request, res: Response): void => {
  res.json({
    name: "Network Performance Measurement API",
    version: "1.0.0",
    endpoints: {
      "GET /download/:size": "Download test data (size in bytes, max 100MB)",
      "POST /upload": "Upload test endpoint (send binary data)",
      "GET /ping": "Simple latency test endpoint",
      "GET /latency-test": "Advanced latency test with multiple samples (SSE)",
      "POST /packet-loss-test": "Packet loss calculation endpoint",
      "GET /bandwidth-monitor": "Real-time bandwidth monitoring (SSE)",
      "GET /system-info": "Server system information",
      "GET /health": "Health check endpoint",
      "Socket.IO /": "Comprehensive network diagnostics via Socket.IO",
    },
    usage: {
      download: "GET /download/1048576 (downloads 1MB)",
      upload: "POST /upload with binary data in body",
      latency: "GET /latency-test?samples=20&interval=1000",
      packetLoss: 'POST /packet-loss-test with {"sequences": [0,1,2,3,4]}',
      jitter: 'Socket.IO: {"type": "start_jitter_test"}',
      comprehensive:
        'Socket.IO: {"type": "start_comprehensive_test", "duration": 10000}',
    },
    socketio_commands: {
      start_jitter_test: "Basic jitter measurement",
      start_comprehensive_test:
        "Full network diagnostic (latency, jitter, packet loss)",
      latency_test: "Dedicated latency test with timeout handling",
      ping: "Simple ping-pong for manual RTT calculation",
    },
  });
});

const PORT: number = parseInt(process.env.PORT || "3000");

server.listen(PORT, (): void => {
  console.log(`Network performance measurement server running on port ${PORT}`);
  // console.log(`HTTP endpoints available at http://localhost:${PORT}`);
  console.log(`Socket.IO server is ready.`);
});

export { app, server };
