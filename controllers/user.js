const User = require('../models/User')

class UserController {
  // async getDashboardView (req, res) {
  //   console.log(req.body)
  //   return res.render('dashboard')
  // }

  async getByUsername (username) {
    return await User.readByUsername(username)
  }

  async update (userData, id) {
    return await User.update(userData, id)
  }
}

module.exports = UserController
