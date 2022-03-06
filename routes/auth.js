const express = require('express')
const AuthController = require('../controllers/auth')

const authController = new AuthController()

const auth = app => {
  const router = express.Router()
  app.use('/auth', router)

  router.post('/login', async (req, res) => {
    const credentials = req.body
    const response = await authController.login(credentials)

    if (response.fail) return res.status(400).json(response)
    return res.status(200).json({ url: `/user/${response.user.username}` })
  })

  router.post('/signup', async (req, res) => {
    const userdata = req.body
    userdata.cellphone = userdata.cellphone || undefined
    userdata.profile_pic = userdata.profile_pic || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    const response = await authController.signup(userdata)

    if (response.fail) return res.status(400).json(response)
    // return res.redirect(301, `/user/${response.data.user_id}`)
    return res.status(201).json({ url: `/user/${response.data.username}` })
  })
}

module.exports = auth
