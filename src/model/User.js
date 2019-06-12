const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
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
        type: Schema.types.ObjectId,
        ref:"Driver",
        required: function() {
            return this.deliveryClient === null;
        }
        },
    deliveryClient: {
        type: Schema.types.ObjectId,
        ref:"DeliveryClient",
        required: function() {
            return this.driver === null;
        }
    }
});

module.exports = mongoose.model('User',UserSchema);