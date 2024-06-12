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
        faustinaBold:['Faustina Bold','sans-serif'],
        faustinaMedium:['Faustina Medium','sans-serif'],
        faustinaLight:['Faustina Light','sans-serif']
      }
    }
  }
};
