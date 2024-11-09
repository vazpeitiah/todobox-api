const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user.model')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.userId)
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      } catch (err) {
        return done(err, false)
      }
    })
  )
}
