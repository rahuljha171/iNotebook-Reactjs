const express = require('express');
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//Get All the notes  using: GET "/api/auth/getuser" . login required 

router.get('/fetchallnote', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });//find the user by its id 

        res.json(notes);//responded by the api req 

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

//Add new notes  using: Post "/api/note/addnote" .  login required 

router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 4 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;//destructuring to get variable w/ their values thing from the body

        //If there are errors return Bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //create a object in which variable pass
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        //save the variables and then show it 
        const saveNotes = await note.save();
        res.json(saveNotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

//Updates an existing  Notes  using: Put "/api/note/updatenote" .  login required 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {


        const { title, description, tag } = req.body;//destructuring 
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }


        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

})


//Delete an existing  Notes  using: Delete "/api/note/deletenote" .  login required 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

       // const { title, description, tag } = req.body;//destructuring 

        //find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //allow deletion if user is auth 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been Delete",  note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

})

module.exports = router;
