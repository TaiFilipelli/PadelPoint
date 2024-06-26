import keepPreset, { theme } from "keep-react/preset";
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
  theme: {
    extend: {
      fontFamily: {
        poppinsBlack:['Poppins Black','sans-serif'],
        poppinsBold:['Poppins Bold','sans-serif'],
        poppinsMedium:['Poppins Medium','sans-serif'],
        poppinsRegular:['Poppins Regular','sans-serif'],
        poppinsLight:['Poppins Light','sans-serif']
      },
      colors: {
        'custom-light-bg': '#f8f9fa',
        'custom-dark-bg': '#242424',
      },
      width:{
        '150vh':'150vh',
      },
      height:{
        '180vh':'180vh',
        '130vh':'130vh',
      }
    }
  }
};
