import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../hooks/use-theme";
import { BiBook } from "react-icons/bi";
import "../App.css"; // Import your CSS file

interface NavProps {
  setFont: React.Dispatch<React.SetStateAction<string>>;
}

const themeIcons: Record<string, string> = {
  system: "🖥️",
  light: "🌞",
  dark: "🌙",
};

const themeLabels: Record<string, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const themeOrder: Array<"system" | "light" | "dark"> = [
  "system",
  "light",
  "dark",
];

const fontLabels: Record<string, string> = {
  serif: "Serif",
  "sans-serif": "Sans Serif",
  monospace: "Monospace",
};

const fontOptions = ["serif", "sans-serif", "monospace"];

const Nav: React.FC<NavProps> = ({ setFont }) => {
  const { theme, setTheme } = useTheme();
  const [selectedFont, setSelectedFont] = useState("sans-serif");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFont(selectedFont);
  }, [selectedFont, setFont]);

  useEffect(() => {
    document.documentElement.style.fontFamily = selectedFont;
  }, [selectedFont]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleThemeToggle = () => {
    const currentIdx = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIdx + 1) % themeOrder.length];
    setTheme(nextTheme);
  };

  return (
    <div className="flex justify-between items-center py-5">
      <div>
        <BiBook className="text-2xl text-[#A0A0A0]" />
      </div>
      <div className="flex justify-between md:w-[30%] items-center gap-2">
        {/* Custom Font Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="min-w-[120px] px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            {fontLabels[selectedFont]}
            <svg
              className="ml-2 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <ul
              className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg focus:outline-none"
              tabIndex={-1}
              role="listbox"
            >
              {fontOptions.map((font) => (
                <li
                  key={font}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedFont === font
                      ? "font-bold text-indigo-600 dark:text-indigo-400"
                      : ""
                  }`}
                  role="option"
                  aria-selected={selectedFont === font}
                  tabIndex={0}
                  onClick={() => {
                    setSelectedFont(font);
                    setDropdownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedFont(font);
                      setDropdownOpen(false);
                    }
                  }}
                >
                  {fontLabels[font]}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="mx-3 border-l-[1px] h-6"></span>
        <span className="flex items-center">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
            title={themeLabels[theme]}
          >
            <span className="text-xl">{themeIcons[theme]}</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default Nav;
