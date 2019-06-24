const mongoose = require('mongoose');

const DeliveryGoodSchema = new mongoose.Schema({
    name: String,
    deliveryDate: Date,
    weight: String, //small, medium, large
    size: String,   //light, medium, heavy
    price: Number,
    deliveryState: String,
    destination: {
        city: String,
        street: String,
        houseNumber: Number,
        postalCode: String
    },
    origination: {
        city: String,
        street: String,
        houseNumber: Number,
        postalCode: String
    }

});

module.exports = mongoose.model('DeliveryGood', DeliveryGoodSchema);