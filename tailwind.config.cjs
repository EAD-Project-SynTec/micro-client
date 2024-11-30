/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'primary': '#44bd32',  //399918    //44bd32
      'secondary': '#F5F7FA',
      'custom_gray':'#1E293B'
     
    },
    extend: {},
  },
  plugins: [],
});
