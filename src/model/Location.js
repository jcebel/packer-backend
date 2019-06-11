const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    city: String,
    street: String,
    houseNumber: Number,
    postalCode: String
});

module.exports = mongoose.model('Location', LocationSchema);