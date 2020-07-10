let app = new (require('express').Router)();
const feedbackController = require('../controllers/feedback');

app.use('', feedbackController);

module.exports = app;