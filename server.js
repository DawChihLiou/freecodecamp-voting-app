const express = require('express')
const mongodb = require('mongodb')
const passport = require('passport')
const session = require('express-session')

const index = require('./src/index/router')
const poll = require('./src/api/poll/router')
const user = require('./src/api/user/router')
const auth = require('./src/api/auth/router')

const app = express()
const mongo = mongodb.MongoClient

const PORT = process.env.PORT || 8080

app.use(express.static(`${__dirname}/dist`))

// session configuration
app.use(session({
    secret: process.env.MY_SECRET,
    resave: true,
    saveUninitialized: true
}))

// passport configuration
app.use(passport.initialize())
app.use(passport.session())

app.use('/', index)
app.use('/api/poll', poll)
app.use('/api/user', user)
app.use('/auth', auth)

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})