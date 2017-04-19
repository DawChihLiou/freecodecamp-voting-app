const express = require('express')
const passportTwitter = require('./twitter')

const router = express.Router()

router.get('/twitter', passportTwitter.authenticate('twitter'))

router.get('/twitter/callback', 
    passportTwitter.authenticate('twitter', {failureRedirect: '/fail'}),
    (req, res) => {
        // Successful authentication
        res.redirect(`/${req.user.value._id}`)
})

router.get('/fail', (req, res) => {
    res.send('login failed')
})

module.exports = router