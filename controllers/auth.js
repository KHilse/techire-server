require('dotenv').config();
const router = require('express').Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const passport = require("../config/ppConfig");

router.get("/google", passport.authenticate("google"));

router.get('/google/callback', 
	passport.authenticate('google', { failureRedirect: '/auth/google' }), 
	(req,res) => {
		res.send("GOOGLE AUTH RESPONSE:" + req.body);
})


router.post('/login', (req,res) => {
	console.log('at login route', req.body);
	let loginName = req.body.w3.ig;
	let loginEmail = req.body.w3.U3;
	console.log('loginEmail:', loginEmail);

	db.User.findOneAndUpdate({
		email: loginEmail
		},
		{
			$setOnInsert: {
				name: loginName,
				email: loginEmail,
				notepad: ''
			}
		},
		{
			returnOriginal: false,
			upsert: true
		}
	)
	.then(user => {
		console.log('USER FOUND OR CREATED', user);
		// Make sure we have a user
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		db.Prep.find({ userId: user._id })
		.then(prepTasks => {
			console.log('PREPTASKS', prepTasks);
			if (prepTasks.length == 0) {
				initPrepTasks(user._id);
			}	
		})
		.catch(err => {
			console.log('ERROR trying to find prep tasks for user');
		})

		// Valid user: Assign a token
		console.log('ASSIGNING A USER TOKEN', user)
		let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
			expiresIn: 60 * 60 * 12
		})
		res.send({ token });
	})
	.catch(err => {
		console.log("ERROR during db lookup of user info");
		res.status(503).send({ message: 'Something went wrong with the db' });
	})
})

// router.post('/signup', (req, res) => {
// 	db.User.findOne({
// 		email: req.body.email
// 	})
// 	.then(user => {
// 		// if user exists, don't let them set up a dupe account
// 		if (user) {
// 			return res.status(409).send({ message: 'Email address already in use on this site' });
// 		}

// 		// User doesn't exist, so create the db entry
// 		db.User.create(req.body)
// 		.then(newUser => {
// 			// Assign a token to the new user
// 			let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
// 				expiresIn: 60 * 60 * 12 // Units in seconds
// 			});
// 			res.send({token});
// 		})
// 		.catch(err => {
// 			console.log("ERROR creating new user record", err);
// 			res.status(500).send({ message: 'Couldn\'t create a new user record' });
// 		})
// 	})
// 	.catch(err => {
// 		console.log('ERROR: existing user found in signup POST', err);
// 		res.status(503).send({ message: 'Something went wrong with the db' });
// 	})
// //	res.send('STUB - auth/signup POST');
// })



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


function initPrepTasks(userId) {
	db.Prep.insertMany([
		{	userId: userId,
			category: 'Brand Statement',
			caption: 'Reflection: your career journey',
			description: 'Your professional story should outline your career journey. You don’t have to detail each role that you’ve had, especially if you’re a mid career professional. Stick to career highlights, and details that inspired, informed, and motivated you to study at GA and begin your new career.<ul><li>What first sparked your interest in your desired field?<li>What events inspired your career journey?<li>Why did you switch roles previously? What motivated you to make changes when you did (framed in a positive way)?<li>What did you gain from each of your previous roles? How did your previous roles help prepare you for your future desired role?</ul>',
			completed: false
		}
		],
		{ordered: true}
	)
}



module.exports = router;