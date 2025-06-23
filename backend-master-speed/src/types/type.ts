import os from "os";

// Type definitions
export interface PingResult {
  sequence: number;
  rtt: number;
  timestamp: number;
}

export interface LatencyStats {
  avg: string;
  min: number;
  max: number;
  samples: number;
}

export interface PacketLossStats {
  percentage: string;
  expected: number;
  received: number;
  lost: number;
  missingSequences: number[];
}

export interface JitterResult {
  value: string;
  unit: string;
}

export interface SpeedMetrics {
  speed: number;
  unit: "Mbps";
}

export interface ComprehensiveTestResult {
  packetLoss: PacketLossStats;
  latency: LatencyStats;
  jitter: JitterResult;
  downloadSpeed?: SpeedMetrics;
  uploadSpeed?: SpeedMetrics;
  testDuration: number;
  rawData: {
    latencies: number[];
    sequences: number[];
  };
}

export interface WebSocketMessage {
  type: string;
  timestamp?: number;
  sequence?: number;
  client_timestamp?: number;
  server_timestamp?: number;
  original_timestamp?: number;
  duration?: number;
  interval?: number;
  samples?: number;
  timeout?: number;
  speed?: number;
}

export interface UploadResult {
  uploadSize: number;
  duration: number;
  speedMbps: number;
  timestamp: string;
}

export interface SystemInfo {
  hostname: string;
  platform: string;
  arch: string;
  cpus: number;
  memory: {
    total: number;
    free: number;
    used: number;
  };
  uptime: number;
  loadavg: number[];
  networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]>;
}

export interface BandwidthData {
  type: "progress" | "complete";
  bytes?: number;
  elapsed?: number;
  currentBandwidth?: number;
  totalBytes?: number;
  duration?: number;
  avgBandwidth?: number;
}

export interface PacketLossTestRequest {
  sequences: number[];
  timeout?: number;
}

export interface PacketLossTestResponse {
  totalPackets: number;
  receivedPackets: number;
  lostPackets: number;
  packetLossPercentage: string;
  receivedSequences: number[];
  timestamp: string;
}
