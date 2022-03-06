const express = require('express')
const BookController = require('../controllers/book')

const router = express.Router()
const bookController = new BookController()

router.get('/', async (req, res) => {
  const books = await bookController.getAll()
  res.render('home', { books })
})

module.exports = router
