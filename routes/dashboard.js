const express = require('express')
const User = require('../controllers/user')
// const Book = require('../controllers/book')
const isLogged = require('../middlewares/isLogged')

const user = app => {
  const router = express.Router()
  const userController = new User()
  app.use('/dashboard', router)

  router.get('/', isLogged, userController.getDashboardView)
  router.get('/mybooks', isLogged, userController.getMyBooksView)
  router.get('/search', isLogged, userController.getSearchView)
  router.get('/update/:id', isLogged, userController.getUpdateView) // Update book page
  router.put('/update', isLogged, userController.update) // Update user post
  router.get('/rent/:id', isLogged, userController.getRentView)
}

module.exports = user
