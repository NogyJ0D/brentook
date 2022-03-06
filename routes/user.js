const express = require('express')
const User = require('../controllers/user')
const Book = require('../controllers/book')

const user = app => {
  const router = express.Router()
  const userController = new User()
  const bookController = new Book()
  app.use('/user', router)

  router.get('/:username', async (req, res) => {
    const { username } = req.params
    const user = await userController.getByUsername(username)

    user[0]
      ? res.render('dashboard', { user: user[0] })
      : res.redirect('/')
  })

  router.get('/:username/books', async (req, res) => {
    const user = await userController.getByUsername(req.params.username)
    const ownedBooks = await bookController.getByOwner(user[0].username)
    const rentedBooks = await bookController.getByConsumer(user[0].username)

    user[0]
      ? res.render('books', { ownedBooks, rentedBooks, user: user[0] })
      : res.redirect('/')
  })

  router.put('/:username', async (req, res) => {
    const user = req.body
    if (user.username !== req.params.username) return res.status(400).json({ fail: true, err: "You can't change your username." })
    const updatedUser = await userController.update(user, user.id)

    updatedUser.fail
      ? res.status(400).json(updatedUser)
      : res.status(200).json({ success: true })
  })
}

module.exports = user
