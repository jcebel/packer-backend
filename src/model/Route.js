const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    kilometers: Number,
    estimatedArrivalTimes: [Date],
    items: [{type:mongoose.SchemaTypes.ObjectId, ref:"DeliveryGood"}],
    auctionBids: [{
        owner:{type:mongoose.SchemaTypes.ObjectId, ref:"Driver"},
        bid:Number,
        timestamp: Date
    }]
});

module.exports = mongoose.model('Route', RouteSchema);