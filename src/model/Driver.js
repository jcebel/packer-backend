const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    driverLicenseNumber: String,
    isAvailable: Boolean,
    vehicle: {type: mongoose.SchemaTypes.ObjectId, ref: "Vehicle"},
    routesToDrive: [{type: mongoose.SchemaTypes.ObjectId, ref: "Route"}]
});

module.exports = mongoose.model('Driver', DriverSchema);