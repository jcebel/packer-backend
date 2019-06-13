const model = require('../../src/model/dataModel');

const handleErr = function(err) {
    console.log(err);
    process.exit(1);
};

// User
const executeTest = function() {
    const deliveryClient = new model.deliveryClient({});

    deliveryClient.save().then( function(client) {

        const jon = new model.user({
            name: "Jon",
            lastName: "Doe",
            birthday: new Date('1995-12-17T03:24:00'),
            homeAddress: {
                city: "Muenchen",
                street: "Luitpoldstrasse",
                houseNumber: 1,
                postalCode: "81554"
            }
        });
        jon.deliveryClient = client._id;
        return jon.save();
    }).then(() => {
        model.user.find().populate('User').then((clients)  => {
           console.log(clients);
        }).catch(handleErr);
    }).catch(handleErr);

};

module.exports = executeTest;