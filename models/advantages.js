const mongoose = require('mongoose');

// Creating new schema!
let advantagesSchema = new mongoose.Schema(
    [
        {
            image: {
                type: String
            },
            title: {
                en: {
                    type: String,
                },
                am: {
                    type: String,
                },
            },
            text: {
                en: {
                    type: String,
                },
                am: {
                    type: String,
                }
            },
        }
    ]
);

module.exports = mongoose.model('Advantages', advantagesSchema);
