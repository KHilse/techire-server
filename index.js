// IMPORTS
require('dotenv').config();
const cors = require('cors');
const express = require('express');
let rowdyLogger = require('./node_modules/rowdy-logger/dist');
const expressJwt = require('express-jwt');
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('flash');
const passport = require("./config/ppConfig");
require('./controllers/documents');

// Instantiate app
const app = express();
const sessionStore = new MongoDBStore({
	uri: 'mongodb://localhost:27017/connect_mongodb_session',
	collection: 'sessions'
});
let rowdyResults = rowdyLogger.begin(app);

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

//Make the session before using Flash or Passport
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		maxAge: 30 * 60 * 1000 // 30 minutes
	}
}))

// Use this line once to set up the store table
//sessionStore.sync();

// This must come AFTER the session and BEFORE passport
app.use(flash());

// Do this last
app.use(passport.initialize());
app.use(passport.session());


// CONTROLLERS
app.use('/auth', expressJwt({
	secret: process.env.JWT_SECRET
}).unless({
	path: [
		{ url: '/auth/login', methods: ['POST'] },
		{ url: '/auth/signup', methods: ['POST'] }
	]
}),
require('./controllers/auth'));
app.use('/documents', require('./controllers/documents'));
app.use('/tasks', require('./controllers/tasks'));
app.use('/preps', require('./controllers/preps'));

// GLOBAL ROUTES
app.get('*', (req, res) => {
	res.status(404).send('Didn\'t find anything here');
})


app.listen(process.env.PORT || 3001, () => {
	console.log('listening on port', process.env.PORT || '3001');
	rowdyResults.print();
});