/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      screens:{
        'sm': '600px',
        'tablet': '840px',
        'desktop': '1024px'
      },
    },
  },
  plugins: [],
}
