const Book = require('../models/Book')
const { DateTime } = require('luxon')

const { format, register } = require('timeago.js')
const esAR = require('../helpers/es-AR')
register('es-AR', esAR)

class BookController {
  async getAll () {
    const books = await Book.readAll()
    books.forEach(book => {
      book.created_date = format(book.created_date, 'es-AR')
    })
    return books
  }

  async getLast10 () {
    const books = await Book.readLast10()
    books.forEach(book => {
      book.created_date = format(book.created_date, 'es-AR')
    })
    return books
  }

  async getById (id) {
    const book = await Book.readById(id)

    if (book[0]) return book[0]
    else return { fail: true, err: "Book doesn't exists." }
  }

  async getByOwner (owner) {
    const books = await Book.readByOwner(owner)
    books.forEach(book => {
      book.created_date = book.created_date.toLocaleString()
    })
    return books
  }

  async getByConsumer (consumer) {
    return await Book.readByConsumer(consumer)
  }

  async create (bookData) {
    bookData.cover_image = bookData.cover_image || 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
    bookData.created_date = DateTime.now().toSQL({ includeOffset: false })
    return await new Book(bookData).create()
  }

  async update (id, data) {
    if (data.title && data.author && data.year && data.publisher && data.price && data.period && data.owner_username) {
      data.id = id
      return new Book(data).update(id)
    } else {
      return { fail: true, err: "You can't send a required field empty." }
    }
  }

  async delete (owner, id) {
    return await Book.delete(owner, id)
  }
}

module.exports = BookController
