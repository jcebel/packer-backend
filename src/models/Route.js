const mongoose = require('mongoose');
const Address = require('./AddressSchema').AddressSchema;

const RouteSchema = new mongoose.Schema({
    currentBid: Number,
    date: Date,
    vehicleType: String,
    meters: Number,
    estimatedTime: Number,
    items: [{type: mongoose.SchemaTypes.ObjectId, ref: "DeliveryGood"}],
    auctionBids: [{
        owner:{type:mongoose.SchemaTypes.ObjectId, ref:"Driver"},
        bid:Number,
        timestamp: Date
    }],
    collect:[Address],
    deliver:[Address]
});

RouteSchema.query.byDate = function (date) {
    return this.where({date: date});
};

RouteSchema.query.byDelGoodId = function (id) {
    // console.log(this.where({routesToDrive: id}));
    return this.where({items: id});
};

module.exports = mongoose.model('Route', RouteSchema);