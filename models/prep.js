const mongoose = require('mongoose');

const prepSchema = new mongoose.Schema({
    userId: String,
    category: String,
    caption: String,
    description: String,
    status: String
})

module.exports = mongoose.model('Prep', prepSchema);