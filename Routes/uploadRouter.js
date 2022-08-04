const express = require('express')

const router = express.Router()

router.post('/', (req, res) => {
    console.log(req)
    res.send('File received')
})

module.exports = router