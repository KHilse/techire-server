// IMPORTS
require('dotenv').config();
const cors = require('cors');
const express = require('express');
let rowdyLogger = require('./node_modules/rowdy-logger/dist');
const expressJwt = require('express-jwt');


// Instantiate app
const app = express();
let rowdyResults = rowdyLogger.begin(app);

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

// CONTROLLERS
app.use('/auth', expressJwt({
	secret: process.env.JWT_SECRET
}).unless({
	path: [
		{ url: '/auth/login', methods: ['POST'] },
		{ url: '/auth/signup', methods: ['POST'] }
	]
}), require('./controllers/auth'));


// GLOBAL ROUTES
app.get('*', (req, res) => {
	res.status(404).send('Didn\'t find anything here');
})


app.listen(process.env.PORT || 8000, () => {
	rowdyResults.print();
});