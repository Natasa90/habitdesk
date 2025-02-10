/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./App.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./app/**/*.{js,jsx,ts,tsx}", 
  "./screens/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./lib/**/*.{js,jsx,ts,tsx}",
  "./assets/**/*.{js,jsx,ts,tsx}",
  "./navigation/**/*.{js,jsx,ts,tsx}",
  "./utils/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "rgb(6, 140, 180)",
        footerBlue: "rgb(246, 250, 251)",
        lionBlue: "rgb(11, 66, 107)",
        transparent: 'transparent'
      },
      fontFamily: {
        sans: ["IBMPlexSerif-Regular", "sans-serif"], 
        IBM_regular: ["IBMPlexSerif-Regular", "sans-serif"],
        IBM_bold: ["IBMPlexSerif-Bold", "sans-serif"],
        IBM_boldItalic: ["IBMPlexSerif-BoldItalic", "sans-serif"],
        IBM_extraLight: ["IBMPlexSerif-ExtraLight", "sans-serif"],
        IBM_extraLightItalic: ["IBMPlexSerif-ExtraLightItalic", "sans-serif"],
        IBM_italic: ["IBMPlexSerif-Italic", "sans-serif"],
        IBM_light: ["IBMPlexSerif-Light", "sans-serif"],
        IBM_lightItalic: ["IBMPlexSerif-LightItalic", "sans-serif"],
        IBM_medium: ["IBMPlexSerif-Medium", "sans-serif"],
        IBM_mediumItalic: ["IBMPlexSerif-MediumItalic", "sans-serif"],
        IBM_semibold: ["IBMPlexSerif-SemiBold", "sans-serif"],
        IBM_semiboldItalic: ["IBMPlexSerif-SemiBoldItalic", "sans-serif"],
        IBM_thin: ["IBMPlexSerif-Thin", "sans-serif"],
        IBM_thinItalic: ["IBMPlexSerif-ThinItalic", "sans-serif"],
},
    },
  },
  plugins: ["nativewind/plugin"],
};
