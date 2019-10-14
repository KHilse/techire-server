require('dotenv').config();
const router = require('express').Router();
const db = require('../models');

// GET all contacts matching the userId
router.get('/:userId', (req, res) => {
    db.Contact.find({
        userId: req.params.userId
    })
    .populate('outstandingRequests')
    .then(contacts => {
        res.send(contacts);
    })
    .catch(err => {
        console.log('ERROR (Contacts GET /):', err);
    })
})

// POST new contact
router.post('/new', (req, res) => {
    db.Contact.create(req.body)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log('ERROR (Contacts POST /add):', err);
    })
})

// PUT (update) contact
router.put('/:userId/update/:id', (req, res) => {
    db.Contact.updateOne({ _id: req.params.id }, req.body)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log('ERROR (Contacts PUT /update', err);
    })
})

// DELETE contact
router.delete('/:userId/delete/:id', (req, res) => {
    db.Contact.findOne({ _id: req.params.id })
    .then(result => {
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
    let reqDate = new Date();
    let reqFDate = new Date();
    reqFDate.setDate(reqFDate.getDate() + 3);
    db.Request.create({
        contact_id: req.params.id,
        type: req.body.type,
        date: reqDate,
        followUpDate: reqFDate 
    })
    .then(newRequest => {
        db.Contact.updateOne( { _id: req.params.id },
            {
                $push: { outstandingRequests: newRequest}
            })
        .then(result => {
            res.send(newRequest);
        })
        .catch(err => {
            console.log('ERROR couldn\'t find contact record', err);
        })    
    })
})

module.exports = router;