const mongodb = require('mongodb')
const mlab = require('../../db/')

const mongo = mongodb.MongoClient

const MONGO_URL = process.env.MONGO_URL

const user = {}

user.create = (data, cb) => {
    mlab.connect(mongo, MONGO_URL, db => {
        db.collection('users').save(data, (err, result) => {
            if (err) console.error(`Unable to create poll. ${err}`)
            cb(result, db)
        })
    })
}

user.addPoll = (data, cb) => {
   mlab.connect(mongo, MONGO_URL, db => {
        
    }) 
}

user.votePoll = (data, cb) => {
    mlab.connect(mongo, MONGO_URL, db => {
        
    })
}



module.exports = user