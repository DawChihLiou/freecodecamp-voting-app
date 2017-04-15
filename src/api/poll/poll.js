const mongodb = require('mongodb')
const mlab = require('../../db/')

const mongo = mongodb.MongoClient

const MONGO_URL = process.env.MONGO_URL

const poll = {}

/**
 * List all polls or polls created by given user
 */
poll.list = (show, userId, cb) => {
    const query = {deleted: false}
    
    if (show === 'mine') query.creater = userId
    
    mlab.connect(mongo, MONGO_URL, db => {
        db.collection('polls').find(query).toArray((err, result) => {
            if (err) console.error(`Unable to fetch polls. ${err}`)
            cb(result, db)
        })
    })
}

/**
 * Find poll by given poll id
 */
poll.find = (pollId, cb) => {
    const pollOid = new mongodb.ObjectID(pollId)
    
    mlab.connect(mongo, MONGO_URL, db => {
        db.collection('polls').findOne({_id: pollOid}, (err, result) => {
            if (err) console.error(`Unable ot fetch poll ${pollId}. ${err}`)
            cb(result, db)
        })
    })
}

/**
 * Create poll
 */ 
poll.create = (data, cb) => {
    mlab.connect(mongo, MONGO_URL, db => {
        db.collection('polls').save(data, (err, result) => {
            if (err) console.error(`Unable to create poll. ${err}`)
            cb(result, db)
        })
    })
}

/**
 * Soft Delete poll 
 */
poll.delete = (pollId, cb) => {
    const pollOid = new mongodb.ObjectID(pollId)
    
    mlab.connect(mongo, MONGO_URL, db => {
        db.collection('polls').update(
            {_id: pollOid}, 
            {$set: {deleted: true}}, 
            (err, result) => {
                if (err) console.error(`Unable to delete poll ${pollId}. ${err}`)
                cb(result, db)
        })
    })
}

/**
 * Vote given poll
 */
poll.vote = (pollId, option, cb) => {
    const pollOid = new mongodb.ObjectID(pollId)
    
    mlab.connect(mongo, MONGO_URL, db => {
        db.collection('polls').update(
            {_id: pollOid, "options.name": option}, 
            {$inc: {"options.$.votes": 1}}, 
            (err, result) => {
                if (err) console.error(`Unable to delete poll ${pollId}. ${err}`)
                cb(result, db)
        })
    })
}

module.exports = poll