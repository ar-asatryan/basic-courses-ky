let app = new (require('express').Router)();
const coursesController = require('../controllers/courses');

app.use('', coursesController);

module.exports = app;