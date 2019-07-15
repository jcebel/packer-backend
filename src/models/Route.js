const mongoose = require('mongoose');
const Address = require('./AddressSchema').AddressSchema;
const deliveryGood = require('./DeliveryGood');

const RouteSchema = new mongoose.Schema({
    currentBid: Number,
    date: Date,
    vehicleType: String,
    meters: Number,
    estimatedTime: Number,
    items: [deliveryGood.schema],
    auctionBids: [{
        owner:{type:mongoose.SchemaTypes.ObjectId, ref:"Driver"},
        bid:Number,
        timestamp: Date
    }],
    collect:[Address],
    deliver:[Address],
    auctionOver: Boolean
});

RouteSchema.query.byDate = function (date) {
    return this.where({date: date});
};

RouteSchema.query.byDelGoodId = function (id) {
    return this.where({"items._id": {$in: [id]}});
};

module.exports = mongoose.model('Route', RouteSchema);