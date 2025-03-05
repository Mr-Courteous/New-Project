const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: String, // Use a string ID for clarity (e.g., 'ABC-2023')
    seq: { type: Number, default: 0 }, // The sequence number
});

module.exports = mongoose.model('Counter', counterSchema);