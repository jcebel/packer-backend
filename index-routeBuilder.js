"use strict";
const mongoose = require('mongoose');
const config = require('./src/config.js');
const model = require('./src/models/dataModel');
const cluster = require('hierarchical-clustering');
const GoogleService = require('./src/services/GoogleService');
const vehicleRecommendation = require('./src/services/vehicleTypeService');

console.log("%       Starting Route Builder      %");

const buildingDate = process.argv[2] ? new Date(process.argv[2]) : new Date(Date.UTC(new Date().getUTCFullYear(),new Date().getUTCMonth(), new Date().getUTCDate(), 12, 0, 0, 0));
console.log("%                                   %");
console.log("%  Build Route For: " + buildingDate.toDateString() + " %");
console.log("%       Starting Route Builder      %");

/**
 *
 * Pseudo Code:
 *
 * 1. Load all Delivery Items for given Date
 * 2. Extract all Start Positions into one Array
 * 3. Hand this Array to GoogleService -> Returns Distance Matrix for all Start Positions.
 * 4. Use a hierarchical clustering algorithm to separate Start points into different Route
 * 5. For each Collection:
 *      5.1 Order Starts based on shorted distance -> Start Array
 *      5.2 Create Route Object with Dist, Items, collect, date
 *      5.3 Collect All Ends Belonging to this start collection -> Array with end points
 *      5.4 Hand this to GoogleService -> Distance Matrix for End Position.
 *      5.5 GoogleService.dist(Collect[collect.length - 1],all End Positions) -> Return Dist_Start-End
 *      5.6 Order End points beginning with lowest value in Dist_Start-End -> Array of end Points
 *      5.7 Add array to Route.deliver
 *          5.7.1 Calculate ETA, Distance.
 *      5.8 Route.vehicleType = VehicleTypeService.vehicleRecommendation(route)
 *      5.9 mongodb.save(route)
 *      5.10 All Items need to be marked as in bidding process (In Route Model AND in the DeliveryGOOD Model)
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
        return distMatrix.rows[distStruct[a._id].position].elements[distStruct[b._id].position].distance.value
    }

    function clusterHierarchical(items, distanceMatrixStart, distStruct) {

        const distance = (a, b) => retrieveTime(a, b, distStruct, distanceMatrixStart);
        // single linkage according to docs.
        const linkage = (distances) => Math.min.apply(null, distances);
        const levels = cluster({
            input: items,
            distance: distance,
            linkage: linkage,
            minClusters: items.length < 4 ? 0 : Math.floor(items.length / 4),
        });
        return mapLevelsToData(levels, items);
    }

    /**
     Returns Time in Seconds
     */
    function retrieveTime(a, b, distStruct, distanceMatrix) {
        return distanceMatrix.rows[distStruct[a._id].position].elements[distStruct[b._id].position].duration.value;
    }

    function sortItemsByDistance(items, distanceMatrix, distStruct, indexOfFirstItem) {
        let item = items[indexOfFirstItem ? indexOfFirstItem : 0];
        let duration = 0;
        let totalDistance = 0;
        const sortedItems = [];
        for (let i = 0; i < items.length; i++) {
            let oldItem = item;
            distStruct[item._id].alreadyVisited = true;
            sortedItems.push(oldItem);
            item = items.reduce((total, otherItem) => {
                if (item._id !== otherItem && !distStruct[otherItem._id].alreadyVisited) {
                    let distance = retrieveTime(item, otherItem, distStruct, distanceMatrix);
                    return distance < total.dist ? {item: otherItem, dist: distance} : total;
                }
                return total;
            }, {dist: Number.MAX_VALUE}).item;
            if (item) { //Fence-post-problem: Only Calculate the Distance/Duration as the last item has not been reached.
                duration += retrieveTime(oldItem, item, distStruct, distanceMatrix);
                totalDistance += retrieveDistance(oldItem, item, distStruct, distanceMatrix);
            }
        }
        return {sortedItems: sortedItems, duration: duration, totalDistance: totalDistance};
    }

    await mongoose.connect(config.mongoURI, {useNewUrlParser: true});
    const allItems = await model.deliveryGood.find().byDate(buildingDate).limit(30);
    console.log("%      found " + allItems.length + " items for routing    %");

    const distanceMatrixStart = await GoogleService.getSquaredDistanceMatrix(allItems.map(
        (item) => item.origination.toString()), 'driving'
    );

    const distanceMatrixEnd = await GoogleService.getSquaredDistanceMatrix(allItems.map(
        (item) => item.destination.toString()), 'driving'
    );

    const distStartStruct = buildDistanceStruct(allItems, distanceMatrixStart);
    const distEndStruct = buildDistanceStruct(allItems, distanceMatrixEnd);

    const startCluster = clusterHierarchical(allItems, distanceMatrixStart, distStartStruct);
    console.log("%     Startpoints are being sorted  %");
    const routes = startCluster.map((deliveryItems, i) => {
        console.log("%     Size of Cluster " + i + ": " + deliveryItems.length + "          %");
        const sortResult = sortItemsByDistance(
            deliveryItems, distanceMatrixStart, distStartStruct);
        const startAddresses = sortResult.sortedItems.map((item) => item.origination);
        return new model.route({
            date: buildingDate,
            items: deliveryItems.map((item) => {
                item.state = 'In Bidding Process';
                return item
            }),
            estimatedTime: sortResult.duration,
            meters: sortResult.totalDistance,
            collect: startAddresses,
            auctionOver: false
        });
    });
    console.log("%   First Endpoint is calculated    %");


    for (let i = 0; i < routes.length; i++) {
        let route = routes[i];
        const distanceMatrixStartEnd = await GoogleService.getDistanceMatrix(route.collect[route.collect.length - 1].toString(),
            route.items.map((item) => item.destination.toString()), 'driving');
        let firstEndpoint = distanceMatrixStartEnd.rows[0].elements.reduce(
            (total, entry, index) => total.currentDuration > entry.duration.value ? {
                currentDuration: entry.duration.value,
                currentDistance: entry.distance.value,
                itemPosition: index
            } : total,
            {currentDuration: Number.MAX_VALUE});

        let sortResult = sortItemsByDistance(route.items, distanceMatrixEnd, distEndStruct, firstEndpoint.itemPosition);
        route.meters += firstEndpoint.currentDistance + sortResult.totalDistance;
        route.estimatedTime += firstEndpoint.currentDuration + sortResult.duration;
        route.deliver = sortResult.sortedItems.map((item) => item.destination);
        route.vehicleType = vehicleRecommendation(route);


        route.currentBid = Math.round(route.items.reduce((previousValue, item) => previousValue + (item.price * 1.1), 0));
        console.log("%      Route starts with: " + Math.round(route.currentBid) + " €      %");
        console.log("%        Endpoint " + i + " calculated      %");
        await route.save();
    }
    console.log("%     All Endpoints are sorted      %");
    await model.deliveryGood.updateMany({_id: {$in: allItems.map(item => item._id)}}, {deliveryState: 'In Bidding Process'});
    console.log("%       Updated Item's state        %")
})()
    .then(() => {
        console.log("%Successfully executed RouteBuilder %");
        process.exit(0);
    })
    .catch((err) => {
        console.log("%Error Occured. Stacktrace attached.%");
        console.log(err);
        process.exit(-1);
    });