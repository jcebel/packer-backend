const GoogleService = require("../src/services/GoogleService");

const handleErr = function (err) {
    console.log(err);
    process.exit(1);
};


const executeGoogleTest = function () {

    GoogleService.getDistanceMatrix(["Aidenbachstraße 94, München"], ["Boltzmannstraße 5, München"], 'driving')
        .then((data) => {
            console.log(data.rows[0].elements[0].distance.value);
            console.log(data.rows[0].elements);
        }).catch((e) => {
        console.log(e);
    });
};

module.exports = executeGoogleTest;