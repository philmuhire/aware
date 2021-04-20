module.exports = {
  purge: {
    enabled: true,
    content: [
      './*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
      // './views/**/*.hbs',
    ],
  },
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
