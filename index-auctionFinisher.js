"use strict";
const mongoose = require('mongoose');
const config = require('./src/config.js');
const model = require('./src/models/dataModel');


console.log("%       Starting Auction Finisher      %");
const buildingDate = process.argv[2] ? new Date(process.argv[2]) :
    new Date(Date.UTC(
        new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(),
        12, 0, 0, 0));
console.log("%                                      %");
console.log("%  Build Route For: " + buildingDate.toDateString() + " %");
console.log("%       Starting Auction Finisher      %");


(async function () {
    await mongoose.connect(config.mongoURI, {useNewUrlParser: true});
    const allRoutes = await model.route.find().byDate(buildingDate);
    console.log("%      found " + allRoutes.length + " routes    %");

    let deliveryGoodIDs = [];
    allRoutes.forEach(function (route) {
        deliveryGoodIDs = deliveryGoodIDs.concat(route.items.map(item => item._id));
    });
    await model.deliveryGood.updateMany({_id: {$in: deliveryGoodIDs}}, {deliveryState: 'Waiting for Pickup'});
    console.log("%       Updated Item's state        %")

    await model.route.updateMany({_id: {$in: allRoutes}}, {auctionOver: true});
    console.log("%       Updated Routes state        %")

    await model.route.updateMany({_id: {$in: allRoutes}}, {"items.$[].deliveryState": 'Waiting for Pickup'});
    console.log("%       Updated items state in route        %")

    let i;
    let driver;
    for (i = 0; i < allRoutes.length; i++) {
        let auctionBids = allRoutes[i].auctionBids;
        if (auctionBids.length === 0) {
            deliveryGoodIDs = [];
            deliveryGoodIDs = deliveryGoodIDs.concat(allRoutes[i].items.map(item => item._id));
            await model.deliveryGood.updateMany({_id: {$in: deliveryGoodIDs}}, {deliveryState: 'Cancelled'});
            await model.route.updateMany({_id: {$in: allRoutes}}, {"items.$[].deliveryState": 'Cancelled'});
        } else if (auctionBids.length === 1) {
            driver = await model.driver.findById(auctionBids[0].owner);
        } else {
            let owner = auctionBids.reduce(function (a, b) {
                return a.bid < b.bid ? a.owner : b.owner;
            });
            driver = await model.driver.findById(owner);
        }
        await driver.routesToDrive.push(mongoose.Types.ObjectId(allRoutes[i]._id));
        await driver.save();
    }
    console.log("%       Updated driver routes        %");


})()
    .then(() => {
        console.log("%Successfully executed Auction Finisher %");
        process.exit(0);
    })
    .catch((err) => {
        console.log("%Error occured when executing Auction Finisher. Stacktrace attached.%");
        console.log(err);
        process.exit(-1);
    });