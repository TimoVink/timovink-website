const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    fontFamily: {
        ...defaultTheme.fontFamily,
        'sans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
