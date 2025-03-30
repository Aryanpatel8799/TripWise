/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**/*.{js,jsx,ts,tsx}'],
  
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#F8F6F2",
        secondary: "#2C3E50",
        highlight: "#8a735d", 
      },
    },
  },
  plugins: [],
}

