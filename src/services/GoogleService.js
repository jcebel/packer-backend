const apiKey = 'AIzaSyAf7aIGVns1ktVf5sw__NGaygucuRsqCiw';
const distance = require('google-distance-matrix');

const getSquaredDistanceMatrix = function(locations, mode){
    return getDistanceMatrix(locations, locations, mode);
};

const getDistanceMatrix = function(start, endpoints, mode) {
    const origins = Array.isArray(start) ? start: [start];
    const destinations = endpoints;

    distance.key(apiKey);
    distance.units('metric');
    distance.mode(mode);

    return new Promise((resolve, reject) => {
        distance.matrix(origins, destinations, function(err, distances) {
            if (distances.status == 'OK') {
                resolve(distances);
            } else if(!locations){
                reject('No locations entered');
            } else if(err){
                reject(err);
            }
        });
    });
};

module.exports = {getSquaredDistanceMatrix:getSquaredDistanceMatrix, getDistanceMatrix:getDistanceMatrix};