const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: String,
    name: String,
    action: String,
    completed: Boolean,
    reminderDate: Date
})

module.exports = mongoose.model('Task', taskSchema);