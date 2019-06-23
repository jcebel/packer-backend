const mongoose = require('mongoose');


const VehicleSchema = new mongoose.Schema({
    maxSize: Number,
    maxDistance: Number,
    maxItems: Number
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);


module.exports = {Vehicle};