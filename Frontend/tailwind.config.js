/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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