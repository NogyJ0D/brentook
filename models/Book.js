const { query, insert } = require('../config/database')

class Book {
  constructor (book) {
    if (book.id) this.id = book.id
    this.title = book.title || null
    this.author = book.author || null
    this.year = book.year || null
    this.publisher = book.publisher || null
    this.price = book.price || null
    this.period = book.period || null
    this.created_date = book.created_date || null
    this.cover_image = book.cover_image || null
    this.owner_username = book.owner_username || null
    this.category = book.category || null
    this.consumer_username = book.consumer_username || null
  }

  static async readAll () {
    return await query('SELECT * FROM books')
  }

  static async readById (id) {
    return await query(`SELECT * FROM books WHERE book_id = "${id}"`)
  }

  static async readByOwner (owner) {
    return await query(`SELECT * FROM books WHERE owner_username = "${owner}"`)
  }

  static async readByConsumer (consumer) {
    return await query(`SELECT * FROM books WHERE consumer_username = "${consumer}"`)
  }

  async create () {
    return await insert('books', this)
  }
}

module.exports = Book
