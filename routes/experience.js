let app = new (require('express').Router)();
const experiencsController = require('../controllers/experience');

app.use('', experiencsController);

module.exports = app;
