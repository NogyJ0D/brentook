const express = require('express')
// const { engine, create } = require('express-handlebars')
const path = require('path')
const { port } = require('./config')

const app = express()

// HandleBars setting
// const hbs = create({
//   defaultLayout: null,
//   extname: 'hbs'
// })

// app.engine('hbs', engine(hbs))
// app.set('view engine', 'hbs')
// app.set('views', 'views')

// EJS setting
app.set('view engine', 'ejs')
app.set('views', 'views')

// Routes
const viewsRoutes = require('./routes/views')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')

// Middlewares
app.use(express.static(path.join(__dirname, '/static')))
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use(viewsRoutes)
authRoutes(app)
userRoutes(app)
bookRoutes(app)

// Start
app.listen(port, () => {
  console.log(`Nodemon Starting\nRunning in port ${port}`)
})

// app.get('/', (req, res) => {
//   res.render('home')
// })

// TODO: update y delete de mis libros
