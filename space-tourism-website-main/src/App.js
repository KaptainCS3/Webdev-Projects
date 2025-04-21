import React from "react";
import Home from "./component/Home";
import Nav from "./component/Nav";
import Destination from "./component/Destination";
import home from "./home.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const descriptions = home.descriptions.content;
const hero = home.hero.content;
const explore = home.explore.content;
const space = home.space.content;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div>
              <Nav />
              <Home
                descriptions={descriptions}
                hero={hero}
                explore={explore}
                space={space}
              />
            </div>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/Destination"
          exact
          element={
            <div>
              <Nav />
              <Destination />
            </div>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/Crew"
          exact
          element={
            <div>
              <Nav />
            </div>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/Technology"
          exact
          element={
            <div>
              <Nav />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
