const model = require('../../src/models/dataModel');

const handleErr = function(err) {
    console.log(err);
    process.exit(1);
};


const executeTest = function() {

    //add deliveryGood
    const dishwasher = new model.deliveryGood({
        name: "Dishwasher",
        deliveryDate: new Date(2019,9,18),
        weight: 80,
        size: 3,
        price: 28,
        deliveryState: "Waiting for Routing",
        destination: {
            city: "Muenchen",
            street: "Theresienstrasse",
            houseNumber: 5,
            postalCode: "84762"
        },
        origination: {
            city: "München",
            street: "Arcisstrasse",
            houseNumber: "28",
            postalCode: "86361"
        }
    });
    dishwasher.save().then( function(delGood) {
        //add delivery client
        const dishwasherClient = new model.deliveryClient({});
        dishwasherClient.goodsToDeliver = delGood._id;
        dishwasherClient.save().then(function (client) {
            const delClient = new model.user({
                name: "Max",
                lastName: "Mustermann",
                birthday: new Date('1995-12-17T03:24:00'),
                homeAddress: {
                    city: "Muenchen",
                    street: "Luitpoldstrasse",
                    houseNumber: 1,
                    postalCode: "81554"
                }
            });
            delClient.deliveryClient = client._id;
            return delClient.save();
        }).then(() => {
            model.deliveryClient.find().then((goods) => {
                console.log(goods);
            }).catch(handleErr);
        }).catch(handleErr);
    }).catch(handleErr);


    //add vehicle
    const vehicle = new model.vehicle({
        maxDistance: 10,
        maxSize: 15,
        maxItems: 8 });
    vehicle.save().then( function(veh) {
        const driver = new model.driver({driverLicenseNumber: "abcde12345", isAvailable: true, vehicle: veh._id});
        driver.save().then(function (driv) {
            const seppDriver = new model.user({
                name: "Sepp",
                lastName: "Müller",
                birthday: new Date('1995-05-08T03:24:00'),
                homeAddress: {
                    city: "Muenchen",
                    street: "Implerstraße",
                    houseNumber: 1,
                    postalCode: "81371"
                }
            });
            seppDriver.driver = driv._id;
            seppDriver.save().then(function (seppUser) {
                const route = new model.route({
                    kilometers: 10,
                    estimatedArrivalTimes: [new Date('1995-12-17T03:24:00')],
                    items: [dishwasher._id],
                    auctionBids: [{
                        owner: driver._id,
                        bid: 4,
                        timestamp: new Date('2019-06-19T03:24:00')
                    }]
                });
                return route.save();
            }).then(() => {
                model.route.find().then((goods) => {
                    console.log(goods);
                }).catch(handleErr);
            }).catch(handleErr);

        }).catch(handleErr);
    }).catch(handleErr);

}

module.exports = executeTest;