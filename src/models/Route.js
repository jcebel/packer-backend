const mongoose = require('mongoose');
const deliveryGood = require('./DeliveryGood');

const RouteSchema = new mongoose.Schema({
    kilometers: Number,
    estimatedArrivalTimes: [Date],
    items: [deliveryGood.schema],
    auctionBids: [{
        owner:{type:mongoose.SchemaTypes.ObjectId, ref:"Driver"},
        bid:Number,
        timestamp: Date
    }]
});

module.exports = mongoose.model('Route', RouteSchema);