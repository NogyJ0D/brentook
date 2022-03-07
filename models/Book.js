const { query, insert, updateBook, delBook } = require('../config/database')

class Book {
  constructor (book) {
    if (book.id) this.id = book.id
    if (book.created_date) this.created_date = book.created_date
    if (book.consumer_username) this.consumer_username = book.consumer_username
    this.title = book.title || null
    this.author = book.author || null
    this.year = book.year || null
    this.publisher = book.publisher || null
    this.price = book.price || null
    this.period = book.period || null
    this.owner_username = book.owner_username || null
    this.category = book.category || null
    this.cover_image = book.cover_image || null
  }

  static async readAll () {
    return await query('SELECT * FROM books')
  }

  static async readLast10 () {
    return await query('SELECT * FROM books ORDER BY created_date DESC LIMIT 10')
  }

  static async readById (id) {
    return await query(`SELECT * FROM books WHERE id = "${id}"`)
  }

  static async readByOwner (owner) {
    return await query(`SELECT * FROM books WHERE owner_username = "${owner}" ORDER BY title`)
  }

  static async readByConsumer (consumer) {
    return await query(`SELECT * FROM books WHERE consumer_username = "${consumer}" ORDER BY title`)
  }

  async create () {
    return await insert('books', this)
  }

  async update (id) {
    return await updateBook(this, this.owner_username, id)
  }

  static async delete (owner, id) {
    return await delBook(owner, id)
  }
}

module.exports = Book
