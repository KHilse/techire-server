require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const db = require('../models');

// GET route for getting all preps for a specific user
router.get('/:userId', (req, res) => {
    // console.log('USERID:', req.params.userId);
    db.User.findOne({ _id: req.params.userId })
    .then(user => {
        console.log('FOUND USER', user.email);
        db.Prep.find({ userId: req.params.userId })
        .then(preps => {
            console.log('FOUND PREPS', preps)
            res.send(preps);
        })
        .catch(err => {
            console.log('ERROR finding preps by user id', err);
            res.status(500).send("ERROR finding user preps");
        })
    })
    .catch(err => {
        console.log('ERROR finding user by id', err);
        res.status(500).send('ERROR finding user by id');
    })
})

module.exports = router;