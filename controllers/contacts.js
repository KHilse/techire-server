require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const db = require('../models');
const mongoose = require('mongoose');

// GET all contacts matching the userId
router.get('/:userId', (req, res) => {
    console.log(`Contacts GET / userId=`, req.params.userId );
    db.Contact.find({
        userId: req.params.userId
    })
    .then(contacts => {
        res.send(contacts);
    })
    .catch(err => {
        console.log('ERROR (Contacts GET /):', err);
    })
})

// POST new contact
router.post('/new', (req, res) => {
    console.log('Contacts NEW req.body=', req.body);
    db.Contact.create(req.body)
    .then(result => {
        return result;
    })
    .catch(err => {
        console.log('ERROR (Contacts POST /add):', err);
    })
})

// PUT (update) contact
router.put('/:userId/update/:id', (req, res) => {
    console.log('CONTACTS PUT route');
    db.Contact.updateOne({ _id: req.params.id }, req.body)
    .then(result => {
        return result;
    })
    .catch(err => {
        console.log('ERROR (Contacts PUT /update', err);
    })
})

// DELETE contact
router.delete('/:userId/delete/:id', (req, res) => {
    console.log('CONTACTS DELETE route');
    db.Contact.findOne({ _id: req.params.id })
    .then(result => {
        console.log(`result=${result.userId}, params=${req.params.userId}`);
        if (result.userId === req.params.userId) {
            db.Contact.deleteOne({ _id: req.params.id})
            .then(result => {
                res.send(true);
            })
            .catch(err => {
                console.log('Failed to delete contact');
            })
        } else {
            console.log('Attempted to delete an unowned contact');            
        }
    })
    .catch(err => {
        console.log('ERROR finding contact for deletion', err);
    })
})

// POST add new outstanding request to contact
router.post('/:userId/contact/:id/newrequest', (req, res) => {
    console.log('CONTACTS POST /addrequest route');
    console.log(`params: user ${req.params.userId}, contact ${req.params.id}`);
    console.log(`body: ${req.body.type}`);
    db.Request.create({
        contact_id: req.params.id,
        type: req.body.type
    })
    .then(newRequest => {
        db.Contact.updateOne( { _id: req.params.id },
            {
                $push: { outstandingRequests: newRequest}
            })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log('ERROR couldn\'t find contact record', err);
        })    
    })
})


module.exports = router;