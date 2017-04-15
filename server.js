const express = require('express')
const mongodb = require('mongodb')

const index = require('./src/index/router')
const api = require('./src/api/poll/router')

const app = express()
const mongo = mongodb.MongoClient

const PORT = process.env.PORT || 8080

app.use(express.static(`${__dirname}/dist`))

api.use('/', index)
app.use('/api', api)

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})