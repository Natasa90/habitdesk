/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
         "./src/**/*.{js,jsx,ts,tsx}",
         "./screens/**/*.{js,tsx,ts}", 
         "./components/**/*.{js,tsx,ts}",
         "./api/**/*.{js,tsx,ts}"
        ],
    theme: {
        extend: {
            colors: {
              'porch-bg': 'rgb(239, 244, 249)',
               'customBlue': 'rgb(35, 81, 194)'
            },
        },
    }, 
    plugins: [],
} 


// Fix these paths!