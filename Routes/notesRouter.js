const express = require('express')
const router = express.Router()

notes = []

router.post('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    

    
    notes.push({noteCreator: req.body.noteCreator, noteId: req.body.noteId, noteContent: req.body.noteContent})
    res.send(`Received Note from ${ip}`)
})

router.get('/', (req, res) => {
    res.send(notes)
})

module.exports = router