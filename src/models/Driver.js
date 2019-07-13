const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    driverLicenseNumber: String,
    isAvailable: Boolean,
    vehicle: {type: mongoose.SchemaTypes.ObjectId, ref: "Vehicle"},
    routesToDrive: [{type: mongoose.SchemaTypes.ObjectId, ref: "Route"}]
});

DriverSchema.query.byRouteId = function (id) {
    // console.log(this.where({routesToDrive: id}));
    return this.where({routesToDrive: id});
};

module.exports = mongoose.model('Driver', DriverSchema);