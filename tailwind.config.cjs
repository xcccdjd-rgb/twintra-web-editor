/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dsrt1: "#07070b",
        dsrt2: "#0b0e1a",
        dsrt3: "#06040a"
      },
      boxShadow: {
        'neon-lg': '0 8px 40px rgba(99,102,241,0.18)'
      },
      backdropBlur: {
        xs: '4px'
      }
    },
  },
  plugins: [],
        }
