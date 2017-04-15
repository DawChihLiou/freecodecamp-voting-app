const mongodb = require('mongodb')
const mlab = require('../../db/mlab')

const mongo = mongodb.MongoClient

const MLAB_URL = process.env.MLAB_URL
const db = undefined

const poll = {}

/**
 * List all polls or polls created by given user
 */
poll.list = (show, userId, cb) => {
    const query = show === 'all' ? {} : {creater: userId}
    
    mlab.connect(mongo, MLAB_URL, db => {
        db.collection('polls').find(query).toArray((err, result) => {
            if (err) console.error(`Unable to fetch polls. ${err}`)
            cb(result, db)
        })
    })
}

/**
 * Find poll by given poll id
 */
poll.find = (id, cb) => {
    mlab.connect(mongo, MLAB_URL, db => {
        db.collection('polls').findOne({_id: new mongodb.ObjectID(id)}, (err, result) => {
            if (err) console.error(`Unable ot fetch poll ${id}. ${err}`)
            cb(result, db)
        })
    })
}

/**
 * Create poll
 */ 
poll.create = (data, cb) => {
    mlab.connect(mongo, MLAB_URL, db => {
        db.collection('polls').save(data, (err, result) => {
            if (err) console.error(`Unable to create poll. ${err}`)
            cb(result, db)
        })
    })
}

module.exports = poll