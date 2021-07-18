const mongoose = require('mongoose');

const exercisesSchema = {
    date: Date,
    title: String,
    sets: Array,
    content: String
}

const Exercise = mongoose.model('Note', exercisesSchema);

module.exports = Exercise;