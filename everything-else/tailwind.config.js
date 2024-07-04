/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'murasaki': "url(https://pbs.twimg.com/media/Fw2D_nzXwAICN8g.jpg:large)",
      }
    },
  },
  plugins: [],
}

