// DB init
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Logger = require('../logger');
const logger = new Logger(); //  Logger start

// MongoDB server joining
const config = require('../config');

mongoose.connect(config.mongoUri, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	poolSize: 10
});

// This function will be called when there is an error
mongoose.connection.on('error', (err) => {
	logger.error("Database Connection Error: " + err);
	// Скажите админу пусть включит MongoDB сервер :)
	logger.error('Run your MongoDB server!');
	process.exit(2);
});

// This function will be called when connection will be done
mongoose.connection.on('connected', () => {
	logger.info("Succesfully connected to MongoDB Database");
});

require('./../models');
