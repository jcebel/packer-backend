"use strict";

const mongoose = require('mongoose');
const config = require('./src/config.js');
const test = require('./src-test/model/testData')

mongoose.connect(config.mongoURI, {useNewUrlParser: true})
    .then(
        info => {
            console.log('SUCCESSFULLY CONNECTED TO DB: ' + info)
            test();

        })
    .catch(reason => console.log('connection error: ' + reason));
