const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto-fix-minmax':'grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

module.exports = config;
