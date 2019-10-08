const mongoose = require('mongoose');

const prepSchema = new mongoose.Schema({
    userId: String,
    category: String,
    caption: String,
    description: String,
    completed: Boolean
})

module.exports = mongoose.model('Prep', prepSchema);