const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userId: String,
    name: String,
    company: String,
    jobTitle: String,
    email: String,
    relationship: String,
    linkedInUrl: String,
    howHelpful: String,
    lastCommunicationDate: Date,
    outstandingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
})

const requestSchema = new mongoose.Schema({
    contact_id: mongoose.Schema.Types.ObjectId,
    type: String,
    date: Date,
    followUpDate: Date
})

module.exports.Request = mongoose.model('Request', requestSchema);
module.exports.Contact = mongoose.model('Contact', contactSchema);