require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 5
	},
	notepad: String
})

module.exports = mongoose.model('User', userSchema);