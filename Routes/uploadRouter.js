const express = require('express')

const router = express.Router()

router.post('/', (req, res) => {
    // fromFile(res)
    res.send(req.files)
})

module.exports = router