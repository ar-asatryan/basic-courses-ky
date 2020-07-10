const Logger = require('../logger');
const logger = new Logger();

module.exports = function (req, res, next) {
    let beginTime = Date.now();

	res.on('finish', () => {
		let d = Date.now();
		logger.log('Reponse time: ' + (d - beginTime), {
			url: req.url,
			time: (d - beginTime)
		});
    });

	next();
}
