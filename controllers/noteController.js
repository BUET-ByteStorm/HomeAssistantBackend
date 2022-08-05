const NoteRepository = require('../database/repository/noteRepository.js');
const noteRepository = new NoteRepository();

class NoteController {
    addNote = async (req, res) => {
        const { userId, content } = req.body;
        const data = await noteRepository.addNote(userId, content);
        if (!data.success)
            return res.status(400).json({
                message: data.message
            });
        return res.status(200).json({
            message: "Successfully added",
            note: {
                id: data.data[0].id,
                userid : data.data[0].userid
            }
        });
    }
    getNote = async (req,res) => {
        const {id} = req.body ;
        const data = await noteRepository.getNote(id);
        if (!data.success)
            return res.status(400).json({
                message: data.message
            });
        return res.status(200).json({
            note: data.data[0]
        });
    }
    getUserNote = async(req,res) => {
        const {userId} = req.body ;
        const data = await noteRepository.getUserNotes(userId);
        if (!data.success)
            return res.status(400).json({
                message: data.message
            });
        return res.status(200).json({
            data : data.data
        });
    }
}
module.exports = NoteController;