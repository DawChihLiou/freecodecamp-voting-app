const express = require('express')
const mongodb = require('mongodb')

const index = require('./src/index/router')
const poll = require('./src/api/poll/router')
const user = require('./src/api/user/router')

const app = express()
const mongo = mongodb.MongoClient

const PORT = process.env.PORT || 8080

app.use(express.static(`${__dirname}/dist`))

app.use('/', index)
app.use('/api/poll', poll)
app.use('/api/user', user)

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})