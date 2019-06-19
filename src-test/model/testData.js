const model = require('../../src/models/dataModel');

const handleErr = function(err) {
    console.log(err);
    process.exit(1);
};


const executeTest = function() {

    //add User
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
        model.user.find().populate('deliveryClient').then((clients)  => {
           console.log(clients);
        }).catch(handleErr);
    }).catch(handleErr);

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
    dishwasher.save().then( function(delGood){

        const dishwasherClient = new model.deliveryClient({});
        dishwasherClient.goodsToDeliver = delGood._id;
        return dishwasherClient.save();
        })
        .then(() =>{
            model.deliveryClient.find().populate('goodsToDeliver').then((goods)  => {
            console.log(goods);
        }).catch(handleErr);
    }).catch(handleErr);
};

module.exports = executeTest;