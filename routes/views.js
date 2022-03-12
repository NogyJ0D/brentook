const express = require('express')
const BookController = require('../controllers/book')
const router = express.Router()

router.get('/', async (req, res) => {
  const books = await new BookController().getLast12()
  if (req.session.fail) {
    const fail = req.session.fail
    delete req.session.fail
    return res.render('home', { user: null, books, fail })
  } else {
    req.session.user
      ? res.render('home', { user: req.session.user, books, fail: null })
      : res.render('home', { user: null, books, fail: null })
  }
})

module.exports = router
