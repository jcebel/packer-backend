const mongoose = require('mongoose');


const VehicleSchema = new mongoose.Schema({
    maxSize: Number,
    maxDistance: Number,
    maxItems: Number
});

module.exports = mongoose.model("Vehicle", VehicleSchema);