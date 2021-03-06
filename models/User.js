const { query, insert, update, unfollow } = require('../config/database')

class User {
  constructor (user) {
    if (user.id) this.id = user.id
    this.firstname = user.firstname || null
    this.lastname = user.lastname || null
    this.username = user.username || null
    this.email = user.email || null
    this.password = user.password || null
    this.birthday = user.birthday || null
    this.cellphone = user.cellphone || null
    this.profile_pic = user.profile_pic || null
  }

  static async readAll () {
    return await query('SELECT * FROM users')
  }

  static async readByUsername (username) {
    return await query(`
        SELECT * 
        FROM users 
        WHERE username = "${username}"
      `)
  }

  static async readByOwner (owner) {
    return await query(`
        SELECT username, firstname, lastname, email, cellphone, profile_pic
        FROM users
        WHERE username = "${owner}"
      `)
  }

  static async login (email) {
    return await query('SELECT * FROM users WHERE email = ?', [email])
  }

  async create () {
    return await insert('users', this)
  }

  static async update (userData, id) {
    return await update('users', userData, id)
  }

  static async follow (data) {
    return await insert('follows', data)
  }

  static async unfollow (follower, following) {
    return await unfollow(follower, following)
  }

  static async readFollowings (follower) {
    return await query(`SELECT * FROM follows WHERE follower = "${follower}"`)
  }

  static async readFollowRelation (follower, following) {
    return await query(`SELECT * FROM follows WHERE follower = "${follower}" AND following = "${following}"`)
  }
}

module.exports = User
