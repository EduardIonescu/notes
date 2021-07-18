const express = require('express');
const router = express.Router();
const Exercise = require('../models/exerciseModel');

router.route('/create').post((req, res) => {
    const { date, title, sets, content } = req.body;
    try {
        const response = Exercise.create({
            date: new Date(date),
            title,
            sets,
            content
        })
        console.log('Exercise was logged successfully ', response)
    } catch (error) {
        throw error
    }
    res.json({ status: 'ok' })
})

router.route('/exercises').get((req, res) => {
    Exercise.find()
        .then(foundExercises => res.json(foundExercises))
})

module.exports = router;