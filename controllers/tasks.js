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
        .sort({ reminderDate: 1 })
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

// POST route to create a new task
router.post('/:userId/new', (req, res) => {
    db.Task.create(req.body)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log('ERROR creating new task');
    })
})

// PUT route for updating a task to completed
router.put('/:userId/:taskId/update', (req, res) => {
    console.log(`PUT set task completed, taskId:${req.params.taskId}`);
    db.Task.updateOne(
        { _id: req.params.taskId },
        { completed: true }
    )
    .then(result => {
        console.log('updated', result);
        res.send(result);
    })
    .catch(err => {
        console.log('ERROR updating task to completed');
    })
})

module.exports = router;