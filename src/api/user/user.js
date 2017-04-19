const mongodb = require('mongodb')
const mlab = require('../../db/')

const mongo = mongodb.MongoClient

const MONGO_URL = process.env.MONGO_URL

const user = {}

/**
 * Create user if not exists
 */ 
user.findOrCreate = (data, cb) => {
    mlab.connect(mongo, MONGO_URL, db => {
        db.collection('users').findAndModify(
            {userId: data.userId},
            [],
            {$setOnInsert: data},
            {new: true, upsert: true},
            (err, doc) => {
                if (err) console.error(`Unable to create user. ${err}`)
                cb(doc, db)
        })
    })
}

/**
 * Add poll record to given user if not exists 
 */
user.addPoll = (data, cb) => {
   mlab.connect(mongo, MONGO_URL, db => {
        db.collection('users').update(
            {userId: data.userId},
            {$addToSet: {polls: data.payload}},
            (err, doc) => {
                if (err) console.error(`Unable to create poll for user ${data.userId}. ${err}`)
                cb(doc, db)
            }
        )
    }) 
}

/**
 * Vote given poll of given user
 */ 
user.votePoll = (data, cb) => {
    mlab.connect(mongo, MONGO_URL, db => {
        db.collection('users').update(
            {userId: data.userId, "polls.poll": data.poll},
            {$set: {"polls.$.voted": data.voted}},
            (err, doc) => {
                if (err) console.error(`Unable to vote poll ${data.poll} for user ${data.userId}. ${err}`)
                cb(doc, db)
            }
        )
    })
}

module.exports = user