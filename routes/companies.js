let app = new (require('express').Router)();
const companiesController = require('../controllers/companies');

app.use('', companiesController);

module.exports = app;