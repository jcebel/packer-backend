const mongoose = require('mongoose');

const vehicleTypes = {bike: "Bike", motorBike: "MotorBike", car: "Car", van: "Van"};

const options = {discriminatorKey: 'type'};
const VehicleSchema = new mongoose.Schema({
    maxSize: Number,
    maxDistance: Number,
    maxItems: Number
}, options);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

const Bike = Vehicle.discriminator(vehicleTypes.bike,new mongoose.Schema({
    //TODO : Bike has no difference to supertype vehicle
}));
const MotorBike = Vehicle.discriminator(vehicleTypes.motorBike,new mongoose.Schema({
    //TODO : MotorBike has no difference to supertype vehicle
}));
const Car = Vehicle.discriminator(vehicleTypes.car,new mongoose.Schema({
    //TODO : Car has no difference to supertype vehicle
}));
const Van = Vehicle.discriminator(vehicleTypes.van,new mongoose.Schema({
    //TODO : Van has no difference to supertype vehicle
}));

module.exports = {Vehicle, Bike, MotorBike, Car, Van,vehicleTypes};