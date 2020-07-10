const Logger = require('../logger');
const logger = new Logger();

let app = new (require('express').Router)();

app.use('/admin', require('./login'));
app.use('/api/courses', require('./courses'));
app.use('/api/advantages', require('./advantages'));
app.use('/api/companies', require('./companies'));
app.use('/api/feedbacks', require('./feedback'));
app.use('/api/experience', require('./experience'));

module.exports = app;
