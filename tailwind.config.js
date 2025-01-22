/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
      "./screens/**/*.{js,tsx,ts}",
      "./components/**/*.{js,tsx,ts}",
      "./lib/**/*.{js,tsx,ts}",
    ],
    theme: {
      extend: {
        colors: {
          'grayScreen': 'rgb(239, 244, 249)',
          'customBlue': 'rgb(6, 140, 180)',
          'footerBlue': 'rgb(246, 250, 251)',
        },
        fontFamily: {
          custom: ['Kanit', 'sans-serif'], 
        },
      },
    },
    plugins: [],
  };
  

// UPDATE THE CONTENT PATHS to include the whole project! 