const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      'tablet':{'max': '1055px'},
      'phone':{'max': '720px'},
      'mini-phone':{'max': '410px'},
    }
  },
  plugins: [],
});