const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}

module.exports = {
  isAuth
}
