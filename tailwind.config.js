import keepPreset, { theme } from "keep-react/preset";
export default {
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
      }
    }
  }
};
