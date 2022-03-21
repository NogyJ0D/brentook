const express = require('express')
const UserController = require('../controllers/user')
const isLogged = require('../middlewares/isLogged')

const follow = app => {
  const userController = new UserController()
  const router = express.Router()
  app.use('/follow', router)

  router.get('/:following', isLogged, userController.follow)
  router.get('/unfollow/:following', isLogged, userController.unfollow)
}

module.exports = follow
