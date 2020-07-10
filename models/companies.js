const mongoose = require('mongoose');

// Creating new schema!
let companiesSchema = new mongoose.Schema([
    {
        image: {
            type: String
        }
    }
],
);

module.exports = mongoose.model('Companies', companiesSchema);
