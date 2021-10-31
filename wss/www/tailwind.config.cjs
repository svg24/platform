const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      black: colors.black,
      gray: colors.gray,
      white: colors.white,
    },
  },
};
