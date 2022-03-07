const express = require('express')
const BookController = require('../controllers/book')

const bookController = new BookController()

const book = app => {
  const router = express.Router()
  app.use('/books', router)

  router.get('/get/:id', async (req, res) => {
    const { id } = req.params
    const book = await bookController.getById(id)

    book.fail
      ? res.status(400).json(book)
      : res.status(200).json(book)
  })

  router.post('/create', async (req, res) => {
    const data = req.body
    const book = await bookController.create(data)

    book.fail
      ? res.status(400).json(book)
      : res.status(201).json(book)
  })

  router.post('/update/:id', async (req, res) => {
    const { id } = req.params
    const data = req.body
    const book = await bookController.update(id, data)

    // book.fail || book.affectedRows === 0
    return res.redirect(`/user/${data.owner_username}/books`)
  })

  router.delete('/:owner/:id', async (req, res) => {
    const { owner, id } = req.params
    const response = await bookController.delete(owner, id)

    return res.redirect(`/user/${owner}/books`)
  })
}

module.exports = book
