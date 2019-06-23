const mongoose = require('mongoose');

const DeliveryClientSchema = new mongoose.Schema({
    goodsToDeliver: [{type: mongoose.SchemaTypes.ObjectId, ref: "DeliveryGood"}]
});

module.exports = mongoose.model('DeliveryClient', DeliveryClientSchema);