const dotenv = require('dotenv').config();
const passport = require("passport");
const passportGoogleOauth = require("passport-google-oauth");
const GoogleStrategy = passportGoogleOauth.OAuth2Strategy;
const db = require("../models");

passport.use(new GoogleStrategy({
	clientID: process.env.TECHIRE_GOOGLE_CLIENT_ID,
	clientSecret: process.env.TECHIRE_GOOGLE_CLIENT_SECRET,
	scope: process.env.GOOGLE_AUTH_SCOPE,
	callbackURL: process.env.TECHIRE_BASE_URL + "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
	console.log("Hello from the google passport route")
	db.user.findOrCreate({
		where: { googleId: profile.id }
	}).spread((user, created) => {
		var tempUser = {...user.dataValues, accessToken};
		return cb(null, tempUser);
	})
}))

passport.serializeUser((user, cb) => {
	cb(null, user);
})

passport.deserializeUser((obj, cb) => {
	cb(null, obj);
})

module.exports = passport;