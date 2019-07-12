const model = require('../../src/models/dataModel');

const handleErr = function (err) {
    console.log(err);
    process.exit(1);
};


const executeTest = function () {

    //add deliveryGood
    const dishwasher = new model.deliveryGood({
        name: "Dishwasher",
        deliveryDate: new Date(2019, 9, 18),
        weight: "heavy",
        size: "large",
        price: 28,
        deliveryState: "Delivered",
        destination: {
            city: "Muenchen",
            street: "Theresienstrasse",
            houseNumber: "5",
            postalCode: "84762"
        },
        origination: {
            city: "München",
            street: "Arcisstrasse",
            houseNumber: "28",
            postalCode: "86361"
        }
    });
    dishwasher.save().then(function (delGood) {
        //add delivery client
        const dishwasherClient = new model.deliveryClient({});
        dishwasherClient.goodsToDeliver = delGood._id;
        dishwasherClient.save().then(function (client) {
            const user = new model.user({
                email: "maxl",
                password: "abc123",
                firstName: "Max",
                name: "Mustermann",
                birthday: new Date('1995-12-17T03:24:00'),
                homeAddress: {
                    city: "Muenchen",
                    street: "Luitpoldstrasse",
                    houseNumber: "1",
                    postalCode: "81554"
                }
            });
            user.deliveryClient = client._id;
            return user.save();
        }).then(() => {
            model.deliveryClient.find().then((goods) => {
                console.log(goods);
            }).catch(handleErr);
        }).catch(handleErr);
    }).catch(handleErr);

    //add deliveryGood
    const bike = new model.deliveryGood({
        name: "Bike",
        deliveryDate: new Date(2019, 6, 24),
        weight: "heavy",
        size: "large",
        price: 30,
        deliveryState: "Waiting for Routing",
        destination: {
            city: "Muenchen",
            street: "Implerstraße",
            houseNumber: "14",
            postalCode: "81371"
        },
        origination: {
            city: "München",
            street: "Odeonsplatz",
            houseNumber: "28",
            postalCode: "86361"
        }
    });
    bike.save().then(function (delGood) {
        //add delivery client
        const bikeClient = new model.deliveryClient({});
        bikeClient.goodsToDeliver = delGood._id;
        bikeClient.save().then(function (client) {
            const user = new model.user({
                email: "jonasl",
                password: "abc123",
                firstName: "Jonas",
                name: "Ebel",
                birthday: new Date('1995-05-17T03:24:00'),
                homeAddress: {
                    city: "Muenchen",
                    street: "Moosacher Straße",
                    houseNumber: "1",
                    postalCode: "81554"
                }
            });
            user.deliveryClient = client._id;
            return user.save();
        }).then(() => {
            model.deliveryClient.find().then((goods) => {
                console.log(goods);
            }).catch(handleErr);
        }).catch(handleErr);
    }).catch(handleErr);
    const documents = new model.deliveryGood(
        {
            name: "Documents",
            deliveryDate: new Date(2019, 6, 24),
            weight: "heavy",
            size: "large",
            price: 30,
            deliveryState: "In Delivery",
            destination: {
                city: "Muenchen",
                street: "Implerstraße",
                houseNumber: "14",
                postalCode: "81371"
            },
            origination: {
                city: "München",
                street: "Odeonsplatz",
                houseNumber: "28",
                postalCode: "86361"
            }
        });
    const chair = new model.deliveryGood(
    {
        name: "Chair",
            deliveryDate: new Date(2019, 6, 24),
        weight: "heavy",
        size: "large",
        price: 30,
        deliveryState: "Waiting for Pickup",
        destination: {
        city: "Muenchen",
            street: "Implerstraße",
            houseNumber: "14",
            postalCode: "81371"
    },
        origination: {
            city: "München",
                street: "Odeonsplatz",
                houseNumber: "28",
                postalCode: "86361"
        }
    });
    const deliveryClient = new model.deliveryClient({});
    documents.save().then(() => {
        chair.save()
            .then( () => {
                deliveryClient.goodsToDeliver = [dishwasher._id, bike._id, chair._id, documents._id];
                deliveryClient.save();
            }).catch(handleErr);
    }).catch(handleErr);

    //other driver

    const driver2 = new model.driver({driverLicenseNumber: "üpoiuzkn123123", isAvailable: true});
    driver2.save().then(function (driv) {
        return new model.user({
            email: "franzl",
            password: "abc123",
            firstName: "Franz",
            name: "Xaver",
            birthday: new Date('1996-05-08T03:24:00'),
            homeAddress: {
                city: "Muenchen",
                street: "Leopoldstrasse",
                houseNumber: "1",
                postalCode: "81371"
            }
        }).save();
    }).then(function () {
        //add vehicle
        const vehicle = new model.vehicle({
            maxDistance: 10,
            maxSize: 15,
            maxItems: 8
        });
        vehicle.save().then(function (veh) {
            const driver = new model.driver({driverLicenseNumber: "abcde12345", isAvailable: true, vehicle: veh._id});
            driver.save().then(function (driv) {
                const seppDriver = new model.user({
                    email: "seppl",
                    password: "abc123",
                    firstName: "Sepp",
                    name: "Müller",
                    birthday: new Date('1995-05-08T03:24:00'),
                    homeAddress: {
                        city: "Muenchen",
                        street: "Implerstraße",
                        houseNumber: "1",
                        postalCode: "81371"
                    }
                });
                seppDriver.driver = driv._id;
                seppDriver.save().then(function (seppUser) {
                    const route = new model.route({
                        date: new Date('2019-06-20'),
                        vehicleType: "car",
                        meters: 10,
                        estimatedTime: 7200,
                        items: [dishwasher, bike],
                        currentBid:3,
                        auctionBids: [{
                            owner: driver._id,
                            bid: 4,
                            timestamp: new Date('2019-06-19T03:24:00')
                        }, {
                            owner: driver._id,
                            bid: 3,
                            timestamp: new Date('2019-06-19T04:24:00')
                        }],
                        collect: [{
                            city: "München",
                            street: "Fröttmaninger Straße",
                            houseNumber: 18,
                            postalCode: "80805",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }, {
                            city: "München",
                            street: "Grasmeierstraße ",
                            houseNumber: 10,
                            postalCode: "80805",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }, {
                            city: "München",
                            street: "Ungererstraße",
                            houseNumber: 28,
                            postalCode: "86361",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }],
                        deliver: [ {
                            city: "Muenchen",
                            street: "Max-Bill-Straße",
                            houseNumber: 7,
                            postalCode: "80807",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }, {
                            city: "Muenchen",
                            street: "Marianne-Brandt-Straße",
                            houseNumber: 22,
                            postalCode: "80807",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }, {
                            city: "München",
                            street: "Heinrich-Kley-Straße",
                            houseNumber: 12,
                            postalCode: "80807",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }]
                    });
                    return route.save();
                }).then(() => {
                    model.route.find().then((goods) => {
                        console.log(goods);
                    });
                });

            });
        });
    }).catch(handleErr);

    (function createADifferentRoute() {
        const presentItem = new model.deliveryGood({
            name: "Present",
            weight: "medium",
            deliveryDate: new Date(2019, 9, 18),
            size: "medium",
            price: 10,
            deliveryState: "Routed",
            destination: {
                city: "Muenchen",
                street: "Fraunhoferstraße",
                houseNumber: "12",
                postalCode: "84762"
            },
            origination: {
                city: "München",
                street: "Balanstraße",
                houseNumber: "29",
                postalCode: "85794"
            }
        });
        const ornament = new model.deliveryGood({
            name: "Ornament",
            weight: "light",
            deliveryDate: new Date(2019, 9, 18),
            size: "small",
            price: 5,
            deliveryState: "Routed",
            destination: {
                city: "Muenchen",
                street: "Gärtnerplatz",
                houseNumber: "2",
                postalCode: "84762"
            },
            origination: {
                city: "München",
                street: "Ungererstraße",
                houseNumber: "28",
                postalCode: "86361"
            }
        });
        const books = new model.deliveryGood({
            name: "Books",
            weight: "medium",
            deliveryDate: new Date(2019, 9, 18),
            size: "medium",
            price: 15,
            deliveryState: "Routed",
            destination: {
                city: "Muenchen",
                street: "Silberhornstraße",
                houseNumber: 5,
                postalCode: "84762"
            },
            origination: {
                city: "München",
                street: "Kolumbusplatz",
                houseNumber: "28",
                postalCode: "86361"
            }
        });
        presentItem.save().then(() => {
            return ornament.save();
        }).then(() => {
            return books.save();
        }).catch(handleErr);
        const vehicle = new model.vehicle({
            maxDistance: 40,
            maxSize: 30,
            maxItems: 20
        });

        vehicle.save().then(function (veh) {
            const driver2 = new model.driver({
                driverLicenseNumber: "urwefij2q89urhiufhv",
                isAvailable: true,
                vehicle: veh._id
            });
            return driver2.save().then(function (driv) {
                const maxl = new model.user({
                    email: "maxl",
                    password: "abc123",
                    firstName: "Maxl",
                    name: "Rainer",
                    birthday: new Date('1953-02-18'),
                    homeAddress: {
                        city: "Muenchen",
                        street: "Kolumbusplatz",
                        houseNumber: "1",
                        postalCode: "81371"
                    }
                });
                maxl.driver = driver2._id;
                return maxl.save().then(function (maxl) {
                    const route = new model.route({
                        meters: 20,
                        date: "2019-06-24",
                        estimatedTime: 7200,
                        items: [presentItem, books, ornament],
                        vehicleType: "bike",
                        currentBid: 23,
                        auctionBids: [{
                            owner: driver2._id,
                            bid: 30,
                            timestamp: new Date('2019-06-24T16:00:00')
                        }, { // TODO Add one drive that bids inbetween
                            owner: driver2._id,
                            bid: 23,
                            timestamp: new Date('2019-06-24T17:01:00')
                        }],
                        collect: [{
                            city: "München",
                            street: "Balanstraße",
                            houseNumber: "29",
                            postalCode: "85794",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }, {
                            city: "München",
                            street: "Implerstraße",
                            houseNumber: "24",
                            postalCode: "81371",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }, {
                            city: "München",
                            street: "Ungererstraße",
                            houseNumber: "28",
                            postalCode: "86361",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }],
                        deliver: [ {
                            city: "Muenchen",
                            street: "Fraunhoferstraße",
                            houseNumber: "12",
                            postalCode: "84762",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }, {
                            city: "Muenchen",
                            street: "Gärtnerplatz",
                            houseNumber: "2",
                            postalCode: "84762",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }, {
                            city: "München",
                            street: "Kolumbusplatz",
                            houseNumber: "28",
                            postalCode: "86361",
                            location: {
                                type: 'Point',
                                coordinates:[48.125891, 11.595632]
                            }
                        }]
                    });
                    return route.save();
                }).then(() => {
                    model.route.find().then((goods) => {
                        console.log(goods);
                    });
                });

            });
        }).catch(handleErr);
    })();
};

module.exports = executeTest;