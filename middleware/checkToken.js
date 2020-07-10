const jwt = require('jsonwebtoken');
const config = require('../config');

const checkToken = (req, res, next) => {

    jwt.verify(req.token, config.secrettoken, (err, authData) => {
        if (err) {
            res.status(401).json({
                status: false,
                msg: 'Unauthorized'
            });
        } else {
            next();
        }
    });

};

module.exports = checkToken;
