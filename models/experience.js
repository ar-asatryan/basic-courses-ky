const mongoose = require('mongoose');

// Creating new schema!
let experienceSchema = new mongoose.Schema({
    years: {
        type: Number,
    },
    students: {
        type: Number,
    },
    lessons: {
        type: Number,
    },
});

module.exports = mongoose.model('Experience', experienceSchema);
