const express = require('express')
const poll = require('./poll');

const router = express.Router()

/**
 * List all/my polls
 */ 
router.get('/list/:show', (req, res) => {
    
    
    // TODO: user id
    const userId = undefined
    
    poll.list(req.params.show, userId, (polls, db) => {
        res.send(polls)
        db.close()
    })
})

/**
 * Get poll detail
 */ 
router.get('/:id', (req, res) => {
    poll.find(req.params.id, (result, db) =>{
        res.send(result)
        db.close()
    })
})

/**
 * Create new poll
 */
router.post('/new', (req, res) => {
    // TODO: create poll with user input data
    const dummy = {
        creater: 'fjlk213512l3k5jqefqe2134', 
        date: (new Date()).getTime(),
        name: 'which uper hero you like more',
        options: [{name: 'Deadpool', votes: 0}, {name: 'Ant-Man', votes: 0}],
        deleted: false
    }
    
    poll.create(dummy, (result, db) => {
        res.send(result)
        db.close()
    })
})

/**
 * Delete poll with id
 */
router.delete('/:id', (req, res) => {
    poll.delete(req.params.id, (result, db) => {
        res.send(result)
        db.close()
    })
})

/**
 * Vote in poll
 */
router.post('/vote', (req, res) => {
    // TODO: get user input data
    const dummy = {
        id: '58f1c6448227c11d51ad27ba',
        option: 'Coldplay'
    }
    
    // TODO: insert new voting record for the user
    poll.vote(dummy.id, dummy.option, (result, db) => {
        res.send(result)
        db.close()
    })
})

module.exports = router