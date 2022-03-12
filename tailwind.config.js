module.exports = {
  content: ['./views/**/*.ejs', './static/js/*.js'],
  theme: {
    extend: {
      screens: {
        xl: '1180px',
        '2xl': '1280px',
        '3xl': '1366px',
        '4xl': '1680px',
        '5xl': '1920px'
      }
    }
  },
  plugins: []
}
