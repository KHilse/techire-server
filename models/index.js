let mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/techire', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

module.exports.User = require('./user');
module.exports.Task = require('./task');
module.exports.Prep = require('./prep');
module.exports.Contact = require('./contact').Contact;
module.exports.Request = require('./contact').Request;