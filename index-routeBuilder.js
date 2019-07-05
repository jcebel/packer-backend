"use strict";
const mongoose = require('mongoose');
const config = require('./src/config.js');
const model = require('./src/models/dataModel');
const util = require('util');
const cluster = require('hierarchical-clustering');
const ObjectId = require('mongoose').Types.ObjectId;
const GoogleService = require('./src/services/GoogleService');

console.log("%       Starting Route Builder      %");

const buildingDate = process.argv[2] ? new Date(process.argv[2]) : new Date(new Date().toDateString());

console.log("%  Build Route For: " + buildingDate.toDateString() + " %");

function createTestDataItem() {
//TODO Delete this.
    return [
        {
            _id: new ObjectId(),
            city: "Garching bei München",
            street: "",
            houseNumber: "",
            postalCode: "85748",

        },
        {
            _id: new ObjectId(),
            city: "München",
            street: "Implerstraße",
            houseNumber: "12A",
            postalCode: "81371",

        },
        {
            _id: new ObjectId(),
            city: "München",
            street: "Mies-van-der-Rohe-Straße",
            houseNumber: "6d",
            postalCode: "80807",

        }
    ];
}

/**
 *
 * Pseudo Code:
 *
 * 1. Load all Delivery Items for given Date TODO: The Date Retrieval still needs some adaption.
 * 2. Extract all Start Positions into one Array
 * 3. TODO Hand this Array to GoogleService -> Returns Distance Matrix for all Start Positions.
 * 4. Use a hierarchical clustering algorithm to separate Start points into different Route
 * 5. For each Collection:
 *      5.1 Order Starts based on shorted distance -> Start Array
 *      5.2 Create Route Object with Dist, Items, collect, date
 *      5.3 TODO Collect All Ends Belonging to this start collection -> Array with end points
 *      5.4 TODO Hand this to GoogleService -> Distance Matrix for End Position.
 *      5.5 TODO GoogleService.dist(Collect[collect.length - 1],all End Positions) -> Return Dist_Start-End
 *      5.6 TODO Order End points beginning with lowest value in Dist_Start-End -> Array of end Points
 *      5.7 TODO Add array to Route.deliver
 *          5.7.1 TODO Calculate ETA, Distance and Weight.
 *      5.8 TODO Route.vehicleType = VehicleTypeService.vehicleRecommendation(route)
 *      5.9 TODO mongodb.save(route)
 * END
 */

(async function () {
    function mapLevelsToData(levels, data) {
        return levels[levels.length - 1].clusters.map(function (cluster) {
            return cluster.map(function (index) {
                return data[index];
            });
        });
    }

    function buildDistanceStruct(addressList, distanceMatrix) {
        return distanceMatrix.origin_addresses.reduce((total, item, i) => {
            const address = addressList[i];
            total[address._id] = {
                position: i,
                text: item
            };
            return total;
        }, {});
    }

    function retrieveDistance(a, b, distStruct, distMatrix) {
        return distMatrix.rows[distStruct[a._id].position].elements[distStruct[b._id].position].duration.value
    }

    function clusterHierarchical(items, distanceMatrixStart, distStruct) {

        const distance = (a, b) => retrieveDistance(a, b, distStruct, distanceMatrixStart);
        // single linkage according to docs.
        const linkage = (distances) => Math.min.apply(null, distances);
        const levels = cluster({
            input: items,
            distance: distance,
            linkage: linkage,
            minClusters: 2, // TODO: Calculate Minimum Clusters based on size of allStarts?
        });
        return mapLevelsToData(levels, items);
    }

    function sortItemsByDistance(items, distanceMatrix, distStruct) {
        let item = items[0];
        const sortedItems = [];
        for (let i = 0; i < items.length; i++) {
            distStruct[item._id].alreadyVisited = true;
            sortedItems.push(item);
            item = items.reduce((total, otherItem) => {
                if (item._id != otherItem && !distStruct[otherItem._id].alreadyVisited) {
                    let distance = retrieveDistance(item, otherItem, distStruct, distanceMatrix);
                    return distance < total.dist ? {item: otherItem, dist: distance} : total;
                }
                return total;
            }, {dist: Number.MAX_VALUE}).item;
        }
        return sortedItems;
    }

    await mongoose.connect(config.mongoURI, {useNewUrlParser: true});
    const allItems = await model.deliveryGood.find().byDate(buildingDate);
    console.log("%      found " + allItems.length + " items for routing   %");

    /* TODO uncomment
    const distanceMatrixStart = await GoogleService(allItems.map(
        (item) => item.origination.toString()), 'driving'
    );

    const distanceMatrixEnd = await GoogleService(allItems.map(
        (item) => item.destination.toString()), 'driving'
    ); */

    const distanceMatrixStart = require('./src-test/mock-distanceMatrix').mockstart;
    const distanceMatrixEnd = require('./src-test/mock-distanceMatrix').mockend;

    // console.log(util.inspect(distStruct,false, null, true));
    const distStartStruct = buildDistanceStruct(allItems, distanceMatrixStart);
    const distEndStruct = buildDistanceStruct(allItems, distanceMatrixEnd);

    const startCluster = clusterHierarchical(allItems, distanceMatrixStart, distStartStruct);
    console.log("%     Startpoints are being sorted  %");
    const routes = startCluster.map((deliveryItems, i) => {
        console.log("%         Clustersize " + i + ": " + deliveryItems.length + "          %");
        const startAddresses = sortItemsByDistance(
            deliveryItems, distanceMatrixStart, distStartStruct)
            .map((item) => item.origination);
        const route = new model.route(
            new model.route({
                date: buildingDate,
                items: deliveryItems,
                collect: startAddresses
            }));
        return route;
    });

    console.log("%     Endpoints are being sorted    %");

})()
    .then(() => {
        console.log("% Succesfully executed RouteBuilder %");
        process.exit(0);
    })
    .catch((err) => {
        console.log("%Error Occured. Stacktrace attached.%");
        console.log(err);
        process.exit(-1);
    });


