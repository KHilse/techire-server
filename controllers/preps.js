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
            console.log('FOUND PREPS', preps.length)
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

// PUT route for updating Prep item status
router.put('/:userId/:prepsId', (req, res) => {
    console.log('ATTEMPTING to update prep item status');
    console.log('  userId:', req.params.userId);
    console.log('  prepsId:', req.params.prepsId);
    console.log('  newStatus:', req.body);
    db.Prep.updateOne(
        { _id: req.params.prepsId },
        { status: req.body.status }
    )
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log("ERROR updating prep item status", err);
    })
})


module.exports = router;