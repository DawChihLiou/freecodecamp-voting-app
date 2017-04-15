const express = require('express')
const user = require('./user')

const router = express.Router()

/**
 * Create new user if not exists
 */
router.post('/user/new', (req, res) => {
    // TODO: get user input data
    const dummy = {
        username: 'dummydummy',
        polls: []
    }
    
    user.create(dummy, (result, db) => {
        res.send(result)
        db.close()
    })
})

/**
 * Add new poll record for given user
 */
router.post('/user/poll', (req, res) => {
    // TODO: get user input data
    const dummy = {
        poll: '58f1c6448227c11d51ad27ba',
        voted: false
    }
    
    user.addPoll(dummy, (result, db) => {
        res.send(result)
        db.close()
    })
})

/**
 * update poll record as voted for given user
 */
router.put('/user/poll', (req, res) => {
    // TODO: get user input data
    const dummy = {
        poll: '58f1c6448227c11d51ad27ba',
        voted: true
    }
    
    user.votePoll(dummy, (result, db) => {
        res.send(result)
        db.close()
    })
})

module.exports = router