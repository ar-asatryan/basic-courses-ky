const mongoose = require('mongoose');

// Creating new schema!
let blogSchema = new mongoose.Schema(
    [
        {
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
            image: {
                type: String
            }
        }
    ]
);

module.exports = mongoose.model('Blogs', blogSchema);
