const mongoose = require('mongoose');
const deliveryGood = require('./DeliveryGood');
const Address = require('./AddressSchema').AddressSchema;

const RouteSchema = new mongoose.Schema({
    date: Date,
    vehicleType: String,
    kilometers: Number,
    estimatedArrivalTimes: [Date],
    items: [deliveryGood.schema],
    auctionBids: [{
        owner:{type:mongoose.SchemaTypes.ObjectId, ref:"Driver"},
        bid:Number,
        timestamp: Date
    }],
    start:[Address],
    end:[Address]
});

RouteSchema.query.byDate = function (date) {
    return this.where({date: date});
};

module.exports = mongoose.model('Route', RouteSchema);