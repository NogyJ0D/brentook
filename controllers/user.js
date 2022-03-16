const User = require('../models/User')
const Book = require('../models/Book')
const Comment = require('../models/Comment')

class UserController {
  getDashboardView (req, res) {
    if (req.session.fail) {
      const fail = req.session.fail
      delete req.session.fail
      return res.render('dashboard', { user: req.session.user, fail })
    } else {
      return res.render('dashboard', { user: req.session.user, fail: null })
    }
  }

  async getMyBooksView (req, res) {
    const ownedBooks = await Book.readByOwner(req.session.user.username)
    const rentedBooks = await Book.readByConsumer(req.session.user.username)

    return res.render('books', { ownedBooks, rentedBooks, user: req.session.user })
  }

  async getSearchView (req, res) {
    let books
    if (req.body.title) books = await Book.readLikeTitle(req.body.title)
    else books = await Book.readAll()

    return res.render('search', { user: req.session.user, books: books })
  }

  async getUpdateView (req, res) {
    const { id } = req.params
    const book = await Book.readById(id)

    if (!book[0]) {
      req.session.fail = 'El libro no existe.'
      return res.status(404).redirect('/dashboard')
    } else {
      if (book[0].consumer_username) {
        req.session.fail = 'No puedes editar un libro alquilado.'
        return res.status(403).redirect('/dashboard')
      } else if (book[0].owner_username !== req.session.user.username) {
        req.session.fail = 'No puedes editar un libro que no es tuyo.'
        return res.status(403).redirect('/dashboard')
      } else {
        return res.status(200).render('update', { user: req.session.user, book: book[0] })
      }
    }
  }

  async getRentView (req, res) {
    const { id } = req.params
    const book = await Book.readWithOwnerJoin(req.session.user.username, id)

    if (!book[0]) {
      req.session.fail = 'El libro no existe.'
      return res.status(404).redirect('/dashboard')
    } else {
      const comments = await Comment.readByBook(id)
      return res.status(200).render('rent', { book: book[0], user: req.session.user, comments })
    }
  }

  async getOwnerView (req, res) {
    const { owner } = req.params
    const ownerData = await User.readByOwner(owner)
    const books = await Book.readByOwner(owner)

    if (!ownerData[0]) {
      req.session.fail = 'El usuario no existe.'
      return res.status(404).redirect('/dashboard')
    } else if (!books[0]) {
      req.session.fail = 'El usuario no tiene libros disponibles.'
      return res.status(404).redirect('/dashboaord')
    } else {
      return res.status(200).render('userbooks', { user: req.session.user, books, ownerData: ownerData[0] })
    }
  }

  async getByUsername (username) {
    return await User.readByUsername(username)
  }

  async update (req, res) {
    const newData = {
      cellphone: req.body.cellphone || null,
      profile_pic: req.body.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
    }

    const updated = await User.update(newData, req.session.user.id)

    if (updated.changedRows === 1) {
      const user = await User.readByUsername(req.session.user.username)
      delete user[0].password
      req.session.user = user[0]
      return res.status(200).redirect('/dashboard')
    } else {
      req.session.fail = 'Error, intentelo otra vez.'
      return res.status(403).redirect('/dashboard')
    }
  }
}

module.exports = UserController
