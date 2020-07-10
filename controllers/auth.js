let router = new (require('express').Router)();

const multer = require('multer');
const upload = multer();
const jwt = require('jsonwebtoken');
const { User } = require('./../models');
const config = require('../config');


router.post('', upload.none(), (req, res, next) => {

	User.findOne({}, (err, admin) => {
		if (err) { throw (err); }

		if (req.body.login === admin.login && admin.comparePassword(req.body.password, admin.password)) {

			jwt.sign({login: admin.login}, config.secrettoken, {expiresIn: `${config.exp + 'h'}`}, (err, token) => {
				res.status(200).json({
					status: true,
					msg: 'Login success',
					token,
					exp: Date.now() + config.exp * 60 * 60 * 1000 // in milliseconds
				});
			});

		} else {
			res.status(200).json({
				status: false,
				msg: 'Password or login wrong'
			})
		}

	});

});

router.get('', upload.none(), (req, res, next) => {

	User.findOne({}, (err, admin) => {
		if (err) { throw (err); }

		res.status(200).json({
			status: true,
			msg: 'Success',
			body: {
				login: admin.login,
			}
		});

	});

});

router.put('', upload.none(), (req, res, next) => {

	if (req.body === {} || !req.body.newLogin || !req.body.newPassword) {
		res.status(400).json({
			status: false,
			msg: 'Wrong data send'
		});
		return;
	}

	User.findOneAndUpdate(
		{ login: req.body.login },
		{
			login: req.body.newLogin,
			password: User().setPassword(req.body.newPassword)
		},
		{ runValidators: true, new: true },
		(err, admin) => {
			if (err) { throw (err); }

			if (!admin) {
				res.status(204).json({
					status: false,
					msg: 'Admin doesn\'t exist'
				});
			} else {
				res.status(201).json({
					status: true,
					msg: 'Data updated',
					body: {
						oldlogin: req.body.oldlogin,
						login: admin.login,
					}
				});
			}

		});

});

module.exports = router;
