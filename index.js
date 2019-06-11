"use strict";

const mongoose = require('mongoose');
const config = require('./src/config.js');

mongoose.connect(config.mongoURI, {useNewUrlParser: true})
    .then(() => {console.log('SUCCESSFULLY CONNECTED TO DB')})
    .catch(reason => console.error.bind(console, ['connection error: ', reason] ));
