const mongoose = require('mongoose');

// Creating new schema!
let feedbackSchema = new mongoose.Schema(
    [
        {
            name: {
                en: {
                    type: String,
                },
                am: {
                    type: String,
                },
            },
            comment: {
                en: {
                    type: String,
                },
                am: {
                    type: String,
                }
            },
            image: {
                type: String
            }
        }
    ]
);

module.exports = mongoose.model('Feedbacks', feedbackSchema);
