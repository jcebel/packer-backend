"use strict";

const http = require('http');
const mongoose = require('mongoose');

const api = require('./src/api');
const config = require('./src/config.js');

const test = require('./src-test/model/testData');
const google = require('./src-test/GoogleTest');

api.set('port', config.port);

const server = http.createServer(api);

mongoose.connect(config.mongoURI, {useNewUrlParser: true})
    .then(
        () => {
            console.log('SUCCESSFULLY CONNECTED TO DB');
            // only execute test if node is started as test.
            if (process.argv[2] === 'test') {
                test();
            }
            if (process.argv[2] === 'google') {
                google();
            }
            server.listen(config.port);
        })
    .catch(err => {
        console.log('connection error: ' + err.message);
        process.exit(err.statusCode);
    });


server.on('listening', () => {
    console.log(`API is running in port ${config.port}`);
});

server.on('error', (err) => {
    console.log('Error in the server', err.message);
    process.exit(err.statusCode);
});
