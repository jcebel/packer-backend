const apiKey = 'AIzaSyAf7aIGVns1ktVf5sw__NGaygucuRsqCiw';
const distance = require('google-distance-matrix');


const getSquaredDistanceMatrix = function (locations, mode) {
    function buildEmptyDataMatrix(size) {
        const object = {rows: []};

        for (let i = 0; i < size; i++) {

            const element = {
                distance: {text: '1 m', value: 0},
                duration: {text: '1 min', value: 0},
                status: 'OK'
            };
            const array = [];
            array[i] = element;
            object.rows[i] = {elements: array};
        }
        object.origin_addresses = locations;
        object.destination_addresses = locations;
        return object;
    }

    const dataMatrix = buildEmptyDataMatrix(locations.length);
    return locations.reduce(async (acc, location, index, array) => {
        const accumulator = await acc;

        if (index + 1 !== array.length) {
            const start = location;
            const end = array.slice(index + 1, array.length);
            const newData = await getDistanceMatrix(start, end, mode);
            for (let k = 0; k < array.length - (index + 1); k++) {
                accumulator.rows[index].elements[k + index + 1] = newData.rows[0].elements[k];
                accumulator.rows[k + index + 1].elements[index] = newData.rows[0].elements[k];
            }
        }
        return Promise.resolve(accumulator);
    }, Promise.resolve(dataMatrix));
};

const getDistanceMatrix = function (start, endpoints, mode) {
    const origins = Array.isArray(start) ? start : [start];
    const destinations = endpoints;

    distance.key(apiKey);
    distance.units('metric');
    distance.mode(mode);

    return new Promise((resolve, reject) => {
        distance.matrix(origins, destinations, function (err, distances) {
            if (distances.status === 'OK') {
                resolve(distances);
            } else if (!start || !endpoints) {
                reject('No directions entered.');
            } else if (err) {
                reject(err);
            } else {
                reject('Distance Matrix Returned following Status code: ' + distances.status)
            }
        });
    });
};

module.exports = {getSquaredDistanceMatrix: getSquaredDistanceMatrix, getDistanceMatrix: getDistanceMatrix};