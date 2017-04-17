const express = require('express')
const user = require('./user')

const router = express.Router()

/**
 * Create new user if not exists
 */
router.post('/new', (req, res) => {
    // TODO: get user input data
    const dummy = {
        userId: 'aaidldk1j23r23ladsjjd',
        username: 'dummydummy',
        displayName: 'Dummy Dummy',
        polls: []
    }
    
    user.create(dummy, (doc, db) => {
        res.send(doc)
        db.close()
    })
})

/**
 * Add new poll record for given user
 */
router.post('/poll', (req, res) => {
    // TODO: get user input data
    const dummy = {
        userId: 'lskdjlk1j23r23ladsjjd',
        payload: {
            poll: '58f1c6448227c11d51ad27ba',
            voted: false
        }
    }
    
    user.addPoll(dummy, (result, db) => {
        res.send(result)
        db.close()
    })
})

/**
 * Update poll record as voted for given user
 */
router.put('/poll', (req, res) => {
    // TODO: get user input data
    const dummy = {
        userId: 'lskdjlk1j23r23ladsjjd',
        poll: '58f1c6448227c11d51ad27ba',
        voted: true
    }
    
    user.votePoll(dummy, (result, db) => {
        res.send(result)
        db.close()
    })
})

module.exports = router