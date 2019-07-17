const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    firstName: String,
    birthday: Date,
    homeAddress: {
        city: String,
        street: String,
        houseNumber: Number,
        postalCode: String
    },
    driver: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Driver",
        required: function() {
            return this.deliveryClient === null;
        }
        },
    deliveryClient: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"DeliveryClient",
        required: function() {
            return this.driver === null;
        }
    }
});

module.exports = mongoose.model('User',UserSchema);