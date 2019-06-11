"use strict";

const mongoose = require('mongoose');
const config = require('./src/config.js');

mongoose.connect(config.mongoURI, {useNewUrlParser: true})
    .then(
        info => {
            console.log('SUCCESSFULLY CONNECTED TO DB: ' + info)
        })
    .catch(reason => console.log('connection error: ' + reason));
