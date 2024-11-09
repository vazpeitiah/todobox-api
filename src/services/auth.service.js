const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

class AuthService {
  async register(user) {
    const newUser = new User(user)
    return newUser.save()
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      throw new Error('Invalid credentials')
    }
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    const payload = { userId: user._id, email: user.email, name: user.name }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    return { token, user }
  }
}

module.exports = AuthService
