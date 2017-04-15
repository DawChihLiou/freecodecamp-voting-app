const express = require('express')
const router = express.Router()

router.get('/list/:poll', (req, res) => {
   res.send({'poll': req.params.poll})
})

module.exports = router