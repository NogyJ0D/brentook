const Comment = require('../models/Comment')
const { DateTime } = require('luxon')

class CommentController {
  async create (req, res) {
    const data = req.body
    data.created_at = DateTime.now().toSQL({ includeOffset: false })
    const comment = await new Comment(data).create()

    if (comment.fail) {
      req.session.fail = 'Error, inténtelo otra vez'
      return res.status(400).redirect('/dashboard')
    } else {
      return res.status(201).redirect(`/dashboard/rent/${data.book_id}`)
    }
  }
}

module.exports = CommentController
