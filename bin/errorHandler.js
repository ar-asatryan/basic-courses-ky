const Logger = require('../logger');
const logger = new Logger();

module.exports = (err, type, req, res, next) => {
	logger.error(err);
	// res.status(503).send(err.stack || err.message);

	switch (type) {
		case 400:
			res.status(400).json({
				status: false,
				msg: 'Wrong id. Section not found',
			});
			return;
		case 401:
			res.status(401).json({
				status: false,
				msg: 'Wrong data send',
			});
			return;
		case 404:
			res.status(404).json({
				status: false,
				msg: 'Not Found ...'
			});
			return;
		case 500:
			res.status(500).json({
				status: false,
				msg: 'Internal Server Error'
			});
			return;
		case 403:
			res.status(403).json({
				status: false,
				msg: 'Forbidden'
			});
			return;
		case 409:
			res.status(409).json({
				status: false,
				msg: "Conflict error"
			});
			return;
		case 415:
			res.status(415).json({
				status: false,
				msg: "Unsupported Media Type"
			});
			return;
		default:
			res.status(520).json({
				status: false,
				msg: "Unknown server error"
			});
	}
};