const Book = require('../models/Book')
const { DateTime } = require('luxon')

class BookController {
  async getAll () {
    return await Book.readAll()
  }

  async getById (id) {
    return await Book.readById(id)
  }

  async getByOwner (owner) {
    return await Book.readByOwner(owner)
  }

  async getByConsumer (consumer) {
    return await Book.readByConsumer(consumer)
  }

  async create (bookData) {
    bookData.cover_image = bookData.cover_image || 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
    bookData.created_date = DateTime.now().toSQL({ includeOffset: false })
    return await new Book(bookData).create()
  }
}

module.exports = BookController
