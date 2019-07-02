const apiKey = 'AIzaSyAf7aIGVns1ktVf5sw__NGaygucuRsqCiw';

const getDistanceMatrix = function(locations, mode){
    var distance = require('google-distance-matrix');
    let origins = locations;
    var destinations = locations;

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
}

module.exports = getDistanceMatrix;