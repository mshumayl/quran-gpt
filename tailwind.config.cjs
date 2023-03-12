/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lateef: ["lateef", "sans-serif"],
        "zilla-slab-italic": ["zilla-slab-italic", "serif"],
        righteous: ["righteous", "sans-serif"]
      }
    },
  },
  plugins: [],
};

module.exports = config;
