const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Creating admin schema
let userSchema = new mongoose.Schema({
	login: {
		type: String,
		required: [true, "usernameRequired"],
		// Данное поле обязательно. Если его нет вывести ошибку с текстом usernameRequired
		maxlength: [32, "tooLong"],
		// Максимальная длинна 32 Юникод символа (Unicode symbol != byte)
		minlength: [5, "tooShort"],
		// Слишком короткий Логин!
		match: [/^[a-z0-9]+$/, "usernameIncorrect"],
		// Мой любимй формат! ЗАПРЕТИТЬ НИЖНЕЕ ТИРЕ!
		unique: true // Оно должно быть уникальным
	},
	password: {
		type: String,
		required: [true, "passwordRequired"]
	},
});

// Hashing password
userSchema.methods.setPassword = password => (
	bcrypt.hashSync(password, bcrypt.genSaltSync(10))
);

userSchema.methods.comparePassword = (password, hash) => (
	bcrypt.compareSync(password, hash)
);

module.exports = mongoose.model('User', userSchema);
