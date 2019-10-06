const mongoose = require('mongoose');

const networkingSchema = new mongoose.Schema({
    contactName: String,
    company: String,
    jobTitle: String,
    email: String,
    relationshipToUser: String,
    linkedInUrl: String,
    possibleHelp: String,
    lastCommunication: Date
})

module.exports = mongoose.model('Networking', networkingSchema);