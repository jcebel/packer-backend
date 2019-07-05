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
    houseNumber: String,
    postalCode: String,
    location: {
        type: PointSchema,
        required:false
    }
});

AddressSchema.methods.toString = function(){
    let s = '';
    if (this.street) {
        s += this.street + ' ';
        s += this.houseNumber ? this.houseNumber  + ', ': ', ';
    }
    if (this.postalCode) {
        s += this.postalCode + ' ';
    }
    if (this.city) {
        s += this.city;
    }
    return s;
};


module.exports = {AddressSchema:AddressSchema, PointSchema: PointSchema};