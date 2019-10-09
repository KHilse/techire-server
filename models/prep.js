const mongoose = require('mongoose');

const prepSchema = new mongoose.Schema({
    userId: String,
    category: String,
    caption: String,
    description: String,
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    }
})

module.exports = mongoose.model('Prep', prepSchema);