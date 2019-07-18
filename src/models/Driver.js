const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    isAvailable: Boolean,
    vehicle: {type: mongoose.SchemaTypes.ObjectId, ref: "Vehicle"},
    routesToDrive: [{type: mongoose.SchemaTypes.ObjectId, ref: "Route"}]
});

DriverSchema.query.byRouteId = function (id) {
    return this.where({routesToDrive: id});
};

module.exports = mongoose.model('Driver', DriverSchema);