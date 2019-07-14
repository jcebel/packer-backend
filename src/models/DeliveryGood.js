const mongoose = require('mongoose');
const Address = require('./AddressSchema').AddressSchema;

const DeliveryGoodSchema = new mongoose.Schema({
    name: String,
    deliveryDate: Date,
    weight: String, //small, medium, large
    size: String,   //light, medium, heavy
    price: Number,
    distance: Number,
    deliveryState: String,
    destination: Address,
    origination: Address
});

DeliveryGoodSchema.query.byDate = function (date) {
    return this.where({deliveryDate: date, deliveryState: {$eq:"Waiting for Routing"}});
};

module.exports = mongoose.model('DeliveryGood', DeliveryGoodSchema);