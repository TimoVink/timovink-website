const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
        'sans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}
