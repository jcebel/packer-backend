const mongoose = require('mongoose');

const DeliveryGoodSchema = new mongoose.Schema({
    name: String,
    deliveryDate: Date,
    weight: Number,
    size: Number,
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