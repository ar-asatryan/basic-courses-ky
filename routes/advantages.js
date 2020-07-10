let app = new (require('express').Router)();
const advantagesController = require('../controllers/advantages');

app.use('', advantagesController);

module.exports = app;