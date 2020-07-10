const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); // Sessions
const MongoStore = require('connect-mongo')(session); // Sessions save in MongoDB
const config = require('../config');
const Logger = require('../logger');
const logger = new Logger(); //  Logger launch
const { User } = require('./../models');
require('./dbinit'); // DB init

let app = express();

app.use(require('./rt'));


// Cookie parser
app.use(require('cookie-parser')());

app.use(session({
    secret: 'Secret session',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: require('mongoose').connection })
}));

// JSON parser
app.use(bodyParser.json({
    limit: "10kb"
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(require('./../routes')); // Mount routes

// Error handler
app.use(require('./errorHandler'));

// Make uploads directory public
app.use('/uploads', express.static('uploads'));

// Creating admin
User.findOne({}, (err, user) => {
    if (err) { throw(err); }

    if (!user) {
        const defaultUser = new User();
        defaultUser.login = config.admin.login;
        defaultUser.password = defaultUser.setPassword(config.admin.password);

        defaultUser.save((err, User) => {
            if (err) { throw(err); }
        });
    }

});

app.listen(config.port, function (err) {
    if (err) throw err;
    logger.log(`Running server at port ${config.port}!`);
});
