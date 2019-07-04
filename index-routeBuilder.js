"use strict";

console.log("%      Starting Route Builder      %");

const buildingDate = process.argv[2] ? new Date(process.argv[2]) : new Date(new Date().toDateString());

console.log("% Build Route For: " + buildingDate.toDateString() + " %");

/**
 *
 * Pseudo Code:
 *
 * 1. TODO Load all Delivery Items for given Date
 * 2. TODO Extract all Start Positions into one Array
 * 3. TODO Hand this Array to GoogleService -> Returns Distance Matrix for all Start Positions.
 * 4. TODO Use a hierarchical clustering algorithm to separate Start points into different Route
 * 5. For each Collection:
 *      5.1 TODO Order Starts based on shorted distance -> Start Array
 *      5.2 TODO Create Route Object with Dist, Items, collect, date
 *      5.3 TODO Collect All Ends Belonging to this start collection -> Array with end points
 *      5.4 TODO Hand this to GoogleService -> Distance Matrix for End Position.
 *      5.5 TODO GoogleService.dist(Collect[collect.length - 1],all End Positions) -> Return Dist_Start-End
 *      5.6 TODO Order End points beginning with lowest value in Dist_Start-End -> Array of end Points
 *      5.7 TODO Add array to Route.deliver
 *      5.8 TODO Route.vehicleType = VehicleTypeService.vehicleRecommendation(route)
 *      5.9 TODO mongodb.save(route)
 * END
 */