const mongoose = require('mongoose');

// Creating new schema!
let faqSchema = new mongoose.Schema(
    [
        {
            question: {
                en: {
                    type: String,
                },
                am: {
                    type: String,
                },
            },
            answer: {
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

module.exports = mongoose.model('FAQ', faqSchema);
