const verifyToken = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).json({
            status: false,
            msg: 'Need token'
        });
    }

};

module.exports = verifyToken;