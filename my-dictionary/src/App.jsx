import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import "./App.css";
import Search from "./components/Search";
import useDarkMode from "./hooks/useDarkMode";
import Main from "./components/Main";
import KeyWord from "./components/KeyWord";
import Resource from "./components/Resource";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
const App = () => {
  const [result, setResult] = useState([]);
  const [font, setFont] = useState("");
  const [fireworks, setFireworks] = useState(false);
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
  useEffect(() => {
    getWork();
  }, []);

  const getWork = async () => {
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
  };

  //! Theme color State
  const [colorTheme, setColorTheme] = useDarkMode();
  //!Dark mode state
  const [isDarkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );
  //! Dark mode handler
  const toggleDarkMode = (checked) => {
    setColorTheme(colorTheme);
    setDarkMode(checked);
  };
  return (
    <>
      {result.length === 0 ? (
        <p className="text-2xl font-bold h-[100vh] flex justify-center items-center">
          Loading....
        </p>
      ) : (
        <div>
            <div className="w-full dark:bg-[#121212]">
              <div className="sm:w-[85%] sm:mx-auto md:w-[70%] md:mx-auto lg:w-[70%] lg:mx-auto">
                <Nav
                  isDarkMode={isDarkMode}
                  setDarkMode={setColorTheme}
                  toggleDarkMode={toggleDarkMode}
                  setFont={setFont}
                />
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

export default App;
