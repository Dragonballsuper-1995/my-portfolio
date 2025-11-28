/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/**/*.js'
  ],
    theme: {
    extend: {
        fontFamily: {
        sans: ['Inter var', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Apple Color Emoji', 'Segoe UI Emoji'],
        },
    },
    },
  plugins: [],
}
