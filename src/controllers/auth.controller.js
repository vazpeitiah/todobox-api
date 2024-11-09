const AuthService = require('../services/auth.service')
const authService = new AuthService()

class AuthController {
  async register(req, res) {
    try {
      await authService.register(req.body)
      return res.status(201).json({ message: 'User registered' })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const session = await authService.login(email, password)

      req.login(session.user, { session: true }, (error) => {
        if (error) {
          return res.status(500).json({ error: 'Error al guardar la sesión' })
        }
      })

      return res.status(200).json({ token: session.token })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

module.exports = AuthController
