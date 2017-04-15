const express = require('express')
const router = express.Router()

const poll = require('./poll');

router.get('/poll/list/:show', (req, res) => {
    // list all/my polls
    
    // TODO: user id
    const userId = undefined
    
    poll.list(req.params.show, userId, (polls, db) => {
        res.send(polls)
        db.close()
    })
})

router.get('/poll/:id', (req, res) => {
    // poll detail
    poll.find(req.params.id, (result, db) =>{
        res.send(result)
        db.close()
    })
})

router.post('/poll/new', (req, res) => {
    // create new poll
    
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

router.delete('/poll/:id', (req, res) => {
    // delete poll with id
    poll.delete(req.params.id, (result, db) => {
        res.send(result)
        db.close()
    })
})

router.post('/poll/vote', (req, res) => {
    // vote in poll
    
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