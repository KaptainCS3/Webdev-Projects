/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#008060",
        },
        secondary: {
          DEFAULT: "#004c3f",
        },
        accent: {
          DEFAULT: "#ffa881",
        },
        body: {
          DEFAULT: "#677471",
        },
        dark_c: {
          DEFAULT: "#001e19",
        },
        light_c: {
          DEFAULT: "#fbf7ed",
        },
      },
      fontFamily: {
        textFont: ["sans-serif", "DM Sans"],
        priSecAcc: ["Spline Sans", "san-serif"],
      },
    },
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
