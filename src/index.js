const express = require('express')
const cors = require('cors')
const { connectDataBase } = require('./config/db')
require('dotenv').config()
const taskRoute = require('./routes/task.route')
const authRoute = require('./routes/auth.route')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const User = require('./models/user.model')
const { isAuth } = require('./middleware/auth')

require('./config/passport')(passport)

connectDataBase()
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false, // Evita guardar la sesión en cada solicitud si no ha cambiado
    saveUninitialized: false, // No guarda la sesión si no se ha inicializado
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // URI de conexión a MongoDB
      collectionName: 'sessions' // Nombre de la colección donde se guardarán las sesiones
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // Duración de la cookie (1 día en milisegundos)
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

app.use(
  '/api/tasks',
  passport.authenticate('jwt', { session: false }),
  isAuth,
  taskRoute
)
app.use('/auth', authRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
