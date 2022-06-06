module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8bc7b2",
        "secondary": "#6ca893"
      }
    },
    minWidth: {
      '300px': '300px',
    }
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
