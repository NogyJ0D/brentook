const User = require('../models/User')

class AuthController {
  async login (credentials) {
    if (credentials.email && credentials.password) {
      const user = await new User(credentials).login()
      if (user[0]) return { user: user[0] }
      else return { fail: true, message: 'Las credenciales no coinciden.' }
    } else {
      return { fail: true, message: 'Complete todos los campos.' }
    }
  }

  async signup (userdata) {
    return await new User(userdata).create()
    // const newUser = new User(data)
    // return await newUser.create()
  }
}

module.exports = AuthController
