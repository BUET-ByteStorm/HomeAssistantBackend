const express = require('express')
const fs = require('fs')
const fromFile = require('../SpeechRecognition.js')

const router = express.Router()

router.post('/', (req, res) => {
    console.log(req.files.file);
    fromFile(req.files.file.data, res)
})

module.exports = router