import React, { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { BiBook } from "react-icons/Bi";
import "../App.css"; // Import your CSS file

const Nav = ({ isDarkMode, toggleDarkMode, setFont }) => {
  const [check, setCheck] = useState(isDarkMode);
  const [selectedFont, setSelectedFont] = useState("sans-serif"); // Initialize the state variable with a default font family
  setFont(selectedFont);
  useEffect(() => {
    document.documentElement.style.fontFamily = selectedFont;
  }, [selectedFont]);

  // const handleDarkModeToggle = (e) => {
  //   const { name, type, value, checked } = e.target;
  //   setCheck((prev) => {
  //     return {
  //       ...prev,
  //       [name]: type === "checkbox" ? checked : null,
  //     };
  //   });
  //   toggleDarkMode();
  // };
   const handleDarkModeToggle = () => {
     setCheck(!check);
     toggleDarkMode();
   };
  return (
    <div className="flex justify-between items-center py-5">
      <div>
        <BiBook className="text-2xl text-[#A0A0A0]" />
      </div>
      <div className="flex justify-between md:w-[30%]">
        {/* */}
        <select
          className={`sm:w-full md:w-3/4 lg:w-[60%] custom-select appearance-none bg-transparent outline-none dark:text-white font-sans ${selectedFont === "monospace" ? "custom-select-mono" : null}`}
          value={selectedFont}
          onChange={(event) => setSelectedFont(event.target.value)}
        >
          <option value="serif" className="serif">
            Serif
          </option>
          <option value="sans-serif" className="sans-serif">
            Sans Serif
          </option>
          <option value="monospace" className="monospace">
            Monospace
          </option>
        </select>
        <span className="mx-3 border-l-[1px]"></span>
        <span className="flex items-center">
          {/* <!-- Rounded switch --> */}
          <label class="switch mr-2">
            <input
              type="checkbox"
              name="switch"
              onChange={handleDarkModeToggle}
              checked={check}
            />
            <span class="slider round"></span>
          </label>
          <DarkModeSwitch
            checked={check}
            onChange={handleDarkModeToggle}
            size={24}
          />
        </span>
      </div>
    </div>
  );
};

export default Nav;
