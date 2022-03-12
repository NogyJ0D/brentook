const { query, insert, updateBook, delBook } = require('../config/database')
const { format, register } = require('timeago.js')
const esAR = require('../helpers/es-AR')
register('es-AR', esAR)

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
    const books = await query('SELECT * FROM books')
    books.forEach(book => {
      book.created_date = format(book.created_date, 'es-AR')
    })
    return books
  }

  static async readLast12 () {
    const books = await query('SELECT * FROM books ORDER BY created_date DESC LIMIT 12')
    books.forEach(book => {
      book.created_date = format(book.created_date, 'es-AR')
    })
    return books
  }

  static async readById (id) {
    return await query(`
      SELECT * 
      FROM books 
      WHERE id = "${id}"
    `)
  }

  static async readByOwner (owner) {
    const books = await query(`
      SELECT * 
      FROM books 
      WHERE owner_username = "${owner}" 
      ORDER BY title
    `)
    books.forEach(book => {
      book.created_date = format(book.created_date, 'es-AR')
    })
    books.forEach(book => {
      book.rented_date = format(book.rented_date, 'es-AR')
    })
    return books
  }

  static async readByConsumer (consumer) {
    const books = await query(`
      SELECT *
      FROM books
      WHERE consumer_username = "${consumer}"
      ORDER BY title
    `)
    books.forEach(book => {
      book.created_date = format(book.created_date, 'es-AR')
    })
    books.forEach(book => {
      book.rented_date = format(book.rented_date, 'es-AR')
    })
    return books
  }

  static async readWithOwnerJoin (username, id) {
    return await query(`
      SELECT username, firstname, lastname, email, cellphone, profile_pic, books.*
      FROM users
      INNER JOIN books
      ON books.owner_username = users.username
      WHERE books.id = ${id}
      AND NOT username = "${username}"
    `)
  }

  static async readBookOwner (id) {
    return await query('SELECT owner_username FROM books WHERE id = ?', [id])
  }

  async create () { return await insert('books', this) }

  async update () { return await updateBook(this, this.owner_username, this.id) }

  static async delete (id) { return await delBook(id) }

  static async rent (id, consumer, date) {
    return await query(`
      UPDATE books
      SET consumer_username = "${consumer}",
          rented_date = "${date}"
      WHERE id = ${id}
      AND NOT owner_username = "${consumer}"
    `)
  }

  static async return (id, consumer) {
    return await query(`
      UPDATE books
      SET consumer_username = NULL,
          rented_date = NULL
      WHERE id = ${id}
      AND consumer_username = "${consumer}"
    `)
  }
}

module.exports = Book
