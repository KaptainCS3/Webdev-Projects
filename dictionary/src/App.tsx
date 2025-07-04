import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "./contexts/theme-provider";
import Nav from "./components/Nav";
import "./App.css";
import Search from "./components/Search";
import Main from "./components/Main";
import KeyWord from "./components/KeyWord";
import Resource from "./components/Resource";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

interface DictionaryResult {
  word: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
    antonyms: string[];
    synonyms: string[];
  }>;
  phonetics: Array<{
    text?: string;
    audio?: string;
  }>;
  sourceUrls: string[];
}

const AppContent: React.FC = () => {
  const [result, setResult] = useState<DictionaryResult[]>([]);
  const [font, setFont] = useState<string>("");
  const [fireworks, setFireworks] = useState<boolean>(false);
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

  const getWork = useCallback(async () => {
    try {
      const response = await fetch(url + "endure");
      const data = await response.json();
      setResult(data);
      setFireworks(true);
      setTimeout(() => {
        setFireworks(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  }, [url]);

  useEffect(() => {
    getWork();
  }, [getWork]);

  return (
    <>
      {result.length === 0 ? (
        <p className="text-2xl font-bold h-[100vh] flex justify-center items-center">
          Loading....
        </p>
      ) : (
        <div>
          <div className="w-full dark:bg-[#121212] px-4 sm:px-6 md:px-8 overflow-x-hidden">
            <div className="sm:w-[85%] sm:mx-auto md:w-[70%] md:mx-auto lg:w-[70%] lg:mx-auto">
              <Nav setFont={setFont} />
              <Search url={url} setResult={setResult} />
              <KeyWord result={result} />
              <Main result={result} font={font} />
              <Resource result={result} />
              {fireworks && <Fireworks autorun={{ speed: 3, duration: 4 }} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dictionary-theme">
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
