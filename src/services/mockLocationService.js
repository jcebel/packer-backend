//mock locations for showcase
let counter = 0;
const locations = [
    {lat: 48.162955, lng: 11.570895},
    {lat: 48.162744, lng: 11.572582},
    {lat: 48.162525, lng: 11.574242},
    {lat: 48.162539, lng: 11.575744},
    {lat: 48.162605, lng: 11.576584},
    {lat: 48.163292, lng: 11.577530},
    {lat: 48.163972, lng: 11.579214},
    {lat: 48.162333, lng: 11.579837},
    {lat: 48.161059, lng: 11.580738},
    {lat: 48.160780, lng: 11.583613},
    {lat: 48.159850, lng: 11.585609},
    {lat: 48.157868, lng: 11.584676},
    {lat: 48.154919, lng: 11.583431},
    {lat: 48.152278, lng: 11.582444},
    {lat: 48.149987, lng: 11.581114},
    {lat: 48.147761, lng: 11.579988},
    {lat: 48.147532, lng: 11.577080},
    {lat: 48.148706, lng: 11.572992},
    {lat: 48.146802, lng: 11.570471},
    {lat: 48.145649, lng: 11.570889},
    {lat: 48.143883, lng: 11.568597},
    {lat: 48.142834, lng: 11.567492}
];


const getCurrentLoc = function () {
    counter++;
    if (counter > locations.length) {
        counter = 0;
        return locations[locations.length - 1]
    }
    return locations[counter - 1];
};

module.exports = getCurrentLoc;