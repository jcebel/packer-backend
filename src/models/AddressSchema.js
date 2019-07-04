const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        type:String,
        enum:['Point'],
        required:true
    },
    coordinates: {
        type: [Number],
        required:true
    }
});
const AddressSchema = new mongoose.Schema({
    city: String,
    street: String,
    houseNumber: Number,
    postalCode: String,
    location: {
        type: PointSchema,
        required:false
    }
});


module.exports = {AddressSchema:AddressSchema, PointSchema: PointSchema};