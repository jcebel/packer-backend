const GoogleService  = require("../src/services/GoogleService");

const handleErr = function (err) {
    console.log(err);
    process.exit(1);
};


const executeGoogleTest = function () {

    GoogleService(['48.264490, 11.671101', '48.122323, 11.548530', '48.176506, 11.593093'], 'driving')
        .then((data) => {
            console.log(data);
        }).catch((e) => {
            console.log(e);
    });
};

module.exports = executeGoogleTest;