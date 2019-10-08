require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const db = require('../models');

// GET route for getting all tasks for a specific user
router.get('/:userId', (req, res) => {
    // console.log('USERID:', req.params.userId);
    db.User.findOne({ _id: req.params.userId })
    .then(user => {
        console.log('FOUND USER', user.email);
        db.Task.find({ userId: req.params.userId })
        .then(tasks => {
            console.log('FOUND TASKS', tasks)
            res.send(tasks);
        })
        .catch(err => {
            console.log('ERROR finding tasks by user id', err);
            res.status(500).send("ERROR finding user tasks");
        })
    })
    .catch(err => {
        console.log('ERROR finding user by id', err);
        res.status(500).send('ERROR finding user by id');
    })
})

module.exports = router;