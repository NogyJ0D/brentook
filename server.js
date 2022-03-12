const express = require('express')
const path = require('path')
const session = require('express-session')
const methodOverride = require('method-override')
const { port, sessionSecret } = require('./config')

const app = express()

// EJS setting
app.set('view engine', 'ejs')
app.set('views', 'views')

// Routes
const viewsRoutes = require('./routes/views')
const authRoutes = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')
const bookRoutes = require('./routes/books')

// Middlewares
app.use(express.static(path.join(__dirname, '/static')))
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use(viewsRoutes)
authRoutes(app)
dashboardRoutes(app)
bookRoutes(app)

// Start
app.listen(port, () => {
  console.log(`Nodemon Starting\nRunning in port ${port}`)
})
