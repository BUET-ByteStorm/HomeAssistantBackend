const express = require('express')
const { isValidJWTToken } = require('../authentication/authentication.middleware.js')
const NoteController = require('../controllers/noteController');
const noteController = new NoteController();
const router = express.Router()

notes = [{noteCreator: 'Quvi', noteId: '1', noteContent: 'Test'}]

<<<<<<< HEAD
router.post('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    notes.push({noteCreator: req.body.noteCreator, noteId: req.body.noteId, noteContent: req.body.noteContent})
    res.send(`Received Note from ${ip}`)
})
=======
router.use(isValidJWTToken);

// router.post('/', (req, res) => {
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    

    
//     notes.push({noteCreator: req.body.noteCreator, noteId: req.body.noteId, noteContent: req.body.noteContent}) ;
//     noteRepository.addNote(userId,req.body.noteContent) ;
//     res.send(`Received Note from ${ip}`) ;
// })
router.post('/', noteController.addNote) ;
>>>>>>> db891b136e2bd6376a29fc8d73cc0d2905008964

// router.get('/', (req, res) => {
//     res.send(notes)
// }) ;
router.get('/', noteController.getUserNote) ;

module.exports = router