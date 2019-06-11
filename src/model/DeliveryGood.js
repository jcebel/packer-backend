const mongoose = require('mongoose');

const DeliveryGoodSchema = new mongoose.Schema({
    deliveryDate: Date,
    weight: Number,
    size: Number,
    price: Number,
    deliveryState: String,
    destination: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Location"
    },
    origination: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Location"
    }

});

module.exports = mongoose.model('DeliveryGood', DeliveryGoodSchema);