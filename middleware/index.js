let app = new (require('express').Router)();

app.use(require('./verifyToken'));
app.use(require('./checkToken'));

module.exports = app;
