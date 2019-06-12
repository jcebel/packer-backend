const model = require('../../src/model/dataModel');

const handleErr = function(err) {
    console.log(err);
    process.exit(1);
};

// User
const executeTest = function() {
    deliveryClient = new model.deliveryClient({});

    deliveryClient.save(function (err) {
        if (err) {
            handleErr(err)
        }
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

        jon.save(function (err) {
            if (err) {
                handleErr(err);
            }
        });
    });

};

module.exports = executeTest;