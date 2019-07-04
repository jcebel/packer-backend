const mongoose = require('mongoose');
const Address = require('./AddressSchema').AddressSchema;

const DeliveryGoodSchema = new mongoose.Schema({
    name: String,
    deliveryDate: Date,
    weight: String, //small, medium, large
    size: String,   //light, medium, heavy
    price: Number,
    deliveryState: String,
    destination: Address,
    origination: Address
});

module.exports = mongoose.model('DeliveryGood', DeliveryGoodSchema);