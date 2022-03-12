module.exports = function isLogged (req, res, next) {
  if (!req.session.user) {
    req.session.fail = 'Debes iniciar sesión para eso.'
    return res.status(403).redirect('/')
  }
  next()
}
