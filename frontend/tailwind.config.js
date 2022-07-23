module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FF947C",
        "secondary": "#0D1B42",
        "tertiary": "#132964"
      }
    },
    minWidth: {
      '300px': '300px',
    }
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
