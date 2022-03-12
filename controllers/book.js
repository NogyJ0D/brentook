const Book = require('../models/Book')
const { DateTime } = require('luxon')

class BookController {
  async getLast12 () {
    return await Book.readLast12()
  }

  async getById (req, res) {
    const { id } = req.params
    const book = await Book.readById(id)

    book[0]
      ? res.status(200).json({ book: book[0] })
      : res.status(404).json({ fail: true, err: 'El libro no existe.' })
  }

  async create (req, res) {
    const bookData = req.body
    if (!bookData.title || !bookData.author || !bookData.year || !bookData.publisher || !bookData.price || !bookData.period) {
      req.session.fail = 'Complete todos los campos.'
      return res.status(403).redirect('/dashboard')
    } else {
      bookData.cover_image = bookData.cover_image || 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
      bookData.created_date = DateTime.now().toSQL({ includeOffset: false })
      bookData.owner_username = req.session.user.username
      bookData.consumer_username = null
      bookData.id = null

      const book = await new Book(bookData).create()

      if (book.fail) {
        console.log(book)
        req.session.fail = 'Error, intentelo otra vez'
        return res.status(400).redirect('/dashboard')
      } else {
        return res.status(201).redirect('/dashboard/mybooks')
      }
    }
  }

  async update (req, res) {
    const { id } = req.params
    const data = req.body

    if (!data.title || !data.author || !data.year || !data.publisher || !data.price || !data.period || data.consumer_username) {
      req.session.fail = 'Complete todos los campos.'
      return res.status(403).redirect('/dashboard')
    } else {
      data.owner_username = req.session.user.username
      data.id = id

      const updatedBook = await new Book(data).update()

      if (updatedBook.fail) {
        console.log(updatedBook.err)
      } else {
        return res.status(200).redirect('/dashboard/mybooks')
      }
    }
  }

  async delete (req, res) {
    const { id } = req.params
    const owner = await Book.readBookOwner(id)

    if (!owner[0]) {
      req.session.fail = 'El libro no existe.'
      return res.status(404).redirect('/dashboard')
    } else {
      if (owner[0].owner_username !== req.session.user.username) {
        req.session.fail = 'Ese libro no te pertenece.'
        return res.status(403).redirect('/dashboard')
      } else {
        await Book.delete(id)
        return res.status(200).redirect('/dashboard/mybooks')
      }
    }
  }

  async rent (req, res) {
    const date = DateTime.now().toSQL({ includeOffset: false })
    const book = await Book.rent(req.params.id, req.session.user.username, date)

    if (book.changedRows) {
      return res.status(200).redirect('/dashboard/mybooks')
    } else {
      req.session.fail = 'Problema'
      console.log(book)
      return res.status(400).redirect('/dashboard')
    }
  }

  async return (req, res) {
    const book = await Book.return(req.params.id, req.session.user.username)

    if (book.changedRows) {
      return res.status(200).redirect('/dashboard/mybooks')
    } else {
      req.session.fail = 'Problema'
      console.log(book)
      return res.status(400).redirect('/dashboard')
    }
  }
}

module.exports = BookController
