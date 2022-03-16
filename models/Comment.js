const { query, insert, updateBook, delBook } = require('../config/database')
const { format, register } = require('timeago.js')
const esAR = require('../helpers/es-AR')
register('es-AR', esAR)

class Comment {
  constructor (comment) {
    if (comment.id) this.id = comment.id
    this.username = comment.username || null
    this.created_at = comment.created_at || null
    this.text = comment.text || null
    this.book_id = comment.book_id || null
  }

  static async readAll () {
    const comments = await query('SELECT * FROM comments')
    comments.forEach(comment => {
      comment.created_at = format(comment.created_date, 'es-AR')
    })
    return comments
  }

  static async readByBook (id) {
    const comments = await query(`SELECT * FROM comments WHERE book_id = ${id} ORDER BY created_at DESC`)
    comments.forEach(comment => {
      comment.created_at = format(comment.created_at, 'es-AR')
    })
    return comments
  }

  async create (data) {
    return await insert('comments', this)
  }
}

module.exports = Comment
