require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		minlength: 2
	},
	lastname: String,
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 5
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 32
	}
})

// Use BCrypt to hash a password
userSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, process.env.SALT_ROUNDS);
	next();
})

// Write helper function to compare the password hashes
userSchema.methods.isAuthenticated = function(typedPassword) {
	return bcrypt.compareSync(typedPassword, this.password);
}


// Make sure the password doesn't get sent with the rest of the data
userSchema.set('toJSON', {
	transform: (doc, user) => {
		delete user.password;
		return user
	}
})

module.exports = mongoose.model('User', userSchema);