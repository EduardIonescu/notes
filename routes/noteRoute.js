const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel');

router.route('/create').post((req, res) => {
    const { title, content } = req.body;
    try {
        const response = Note.create({
            title,
            content
        })
        console.log('Note created successfully', response)
    } catch (error) {
        throw error
    }
    res.json({ status: 'ok' })
})

router.route('/notes').get((req, res) => {
    Note.find()
        .then(foundNotes => res.json(foundNotes))
})

module.exports = router;