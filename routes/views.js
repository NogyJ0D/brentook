const express = require('express')
const BookController = require('../controllers/book')
const router = express.Router()

// const bookController = new BookController()

router.get('/', async (req, res) => {
  const books = await new BookController().getLast10()
  res.render('home', { books })
})

module.exports = router
