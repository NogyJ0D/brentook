const express = require('express')
const BookController = require('../controllers/book')
const isLogged = require('../middlewares/isLogged')

const book = app => {
  const bookController = new BookController()
  const router = express.Router()
  app.use('/books', router)

  router.get('/get/:id', bookController.getById)
  router.post('/create', isLogged, bookController.create)
  router.put('/:id', isLogged, bookController.update)
  router.delete('/:id', isLogged, bookController.delete)
  router.put('/rent/:id', isLogged, bookController.rent)
  router.put('/return/:id', isLogged, bookController.return)
}

module.exports = book
