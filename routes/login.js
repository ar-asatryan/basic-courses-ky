let app = new (require('express').Router)();
const authController = require('../controllers/auth');

app.use('/auth', authController);

module.exports = app;