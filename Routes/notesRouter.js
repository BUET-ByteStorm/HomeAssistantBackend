const express = require('express')
const { isValidJWTToken } = require('../authentication/authentication.middleware.js')
const NoteController = require('../controllers/noteController');
const noteController = new NoteController();
const router = express.Router()

notes = []

router.use(isValidJWTToken);

// router.post('/', (req, res) => {
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    

    
//     notes.push({noteCreator: req.body.noteCreator, noteId: req.body.noteId, noteContent: req.body.noteContent}) ;
//     noteRepository.addNote(userId,req.body.noteContent) ;
//     res.send(`Received Note from ${ip}`) ;
// })
router.post('/', noteController.addNote) ;

// router.get('/', (req, res) => {
//     res.send(notes)
// }) ;
router.get('/', noteController.getUserNote) ;

module.exports = router