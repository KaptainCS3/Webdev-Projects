/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      sm: { min: "200px", max: "768px" },
      // => @media (min-width: 200px and max-width: 768px) { ... }

      md: { min: "769px", max: "990px" },
      // => @media (min-width: 769px and max-width: 990px) { ... }

      lg: { min: "991px" },
      // => @media (min-width: 991px ) { ... }
    },
  },
  plugins: [],
};
