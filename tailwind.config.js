/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:
      {
        "dark-yellow": {
          200: "#A8A862",
          300: "#969657",
          350: "#87874E",
          400: "#454729",
          500: "#232415",
          600: "#16170D",
          800: "#0F0F02",
        }
      }
    },
  },
  plugins: [],
}

