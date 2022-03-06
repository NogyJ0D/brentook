const express = require('express')
const BookController = require('../controllers/book')

const bookController = new BookController()

const book = app => {
  const router = express.Router()
  app.use('/books', router)

  router.post('/create', async (req, res) => {
    const data = req.body
    const book = await bookController.create(data)

    book.fail
      ? res.status(400).json(book)
      : res.status(201).json(book)
  })
}

module.exports = book
