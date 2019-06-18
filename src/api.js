"use strict";

const express    = require('express');

const deliveryGood = require('./routes/deliveryGood');

const api = express();

api.get('/', (req, res) => {
    res.json({
        name: 'Packer Backend'
    });
});

api.use('/deliverygoods', deliveryGood);

module.exports = api;