const express = require('express')
const AuthController = require('../controllers/auth')

const authController = new AuthController()

const auth = app => {
  const router = express.Router()
  app.use('/auth', router)

  router.post('/login', authController.login)
  router.post('/signup', authController.signup)
  router.get('/logout', authController.logout)
}

module.exports = auth
