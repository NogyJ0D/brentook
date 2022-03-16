const express = require('express')
const CommentController = require('../controllers/comment')
const isLogged = require('../middlewares/isLogged')

const book = app => {
  const commentController = new CommentController()
  const router = express.Router()
  app.use('/comments', router)

  router.post('/create', isLogged, commentController.create)
}

module.exports = book
