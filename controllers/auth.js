require('dotenv').config();
const router = require('express').Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const passport = require("../config/ppConfig");
const PREP_TASKS = require('../init/preptasks');

router.get("/google", passport.authenticate("google"));

router.get('/google/callback', 
	passport.authenticate('google', { failureRedirect: '/auth/google' }), 
	(req,res) => {
		res.send("GOOGLE AUTH RESPONSE:" + req.body);
})

router.post('/login', (req,res) => {
	let loginName = req.body.w3.ig;
	let loginEmail = req.body.w3.U3;

	db.User.findOne({ email: loginEmail })
	.then(user => {
		// Make sure we have a user
		if (!user) {
			// Create new user in server db
			db.User.create({
				email: loginEmail,
				name: loginName,
				notepad: ''
			})
			.then(user => {
				db.Prep.find({ userId: user._id })
				.then(prepTasks => {
					if (prepTasks.length == 0) {
						initPrepTasks(user._id);
					}	
				})
				.catch(err => {
					console.log('ERROR trying to find prep tasks for user', err);
				})
				// Assign a token to the new user
				let token = assignToken(user);
				res.send({ token });					
			})
			.catch(err => {
				console.log('ERROR assigning initial prep tasks to user', err);
			})
		} else {
			// Valid existing user: Assign a token
			let token = assignToken(user);
			res.send({ token });
		}
	})
	.catch(err => {
		console.log("ERROR during db lookup of user info");
		res.status(503).send({ message: 'Something went wrong with the db' });
	})
})

function assignToken(user) {
	return jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
		expiresIn: 60 * 60 * 12
	})
}

// NB: User must be logged in to get to this route
router.get('/current/user', (req,res) => {
	// The user is logged in so req.user should have data
	if (!req.user || !req.user._id) {
		return res.status(417).send({ message: 'Expectation Failed: Check configuration' });
	}

	// Return user data from the time the token was issued
	// Therefore, if you update the user, those changes will
	// not be reflected here. To avoid this, reissue a token
	// when you update user data.
	res.send({ user: req.user });
})

/** If a new user is created, prepopulate it with tasks from the /init/preptasks.js file */
function initPrepTasks(userId) {
	let userPrepTasks = PREP_TASKS.map(task => {
		task.userId = userId;
		return task;
	})
	db.Prep.insertMany(userPrepTasks,
		{ordered: true}
	)
}

module.exports = router;