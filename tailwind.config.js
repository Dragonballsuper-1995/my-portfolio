/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Keeping class based dark mode from original
  theme: {
    extend: {},
  },
  plugins: [],
}
