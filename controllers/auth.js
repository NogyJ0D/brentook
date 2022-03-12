const User = require('../models/User')

class AuthController {
  async login (req, res) {
    const { email, password } = req.body
    const user = await User.login(email)

    if (user.length === 0) {
      req.session.fail = 'El usuario no existe.'
      return res.status(404).redirect('/')
    }

    if (user[0].password === password) {
      delete user[0].password
      req.session.user = user[0]
      return res.status(200).redirect('/dashboard')
    } else {
      req.session.fail = 'Las credenciales no coinciden.'
      return res.status(403).redirect('/')
    }
  }

  async signup (req, res) {
    const data = req.body
    if (!data.firstname || !data.lastname || !data.username || !data.email || !data.password || !data.birthday) {
      req.session.fail = 'Complete todos los campos.'
      return res.status(403).redirect('/')
    }
    const user = await new User(req.body).create()

    if (user.fail && user.err.includes('Duplicate entry')) {
      req.session.fail = 'El usuario ya existe.'
      return res.status(400).redirect('/')
    } else if (user.fail && user.err.includes('cannot be null')) {
      req.session.fail = 'Complete todos los campos.'
      return res.status(400).redirect('/')
    } else {
      const userLogin = await User.login(data.email)
      delete userLogin[0].password
      req.session.user = userLogin[0]
      return res.status(200).redirect('/dashboard')
    }
  }

  async logout (req, res) {
    req.session.destroy()
    return res.status(200).redirect('/')
  }
}

module.exports = AuthController
