const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('session', req.session)
    res.render('index.html')
})

module.exports = router