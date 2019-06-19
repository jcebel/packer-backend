"use strict";

const express    = require('express');
const bodyParser = require('body-parser');

const deliveryGood = require('./routes/deliveryGood');
const deliveryClient = require("./routes/deliveryClient");

const api = express();

api.use(bodyParser.json());


api.get('/', (req, res) => {
    res.json({
        name: 'Packer Backend'
    });
});

api.use('/deliverygoods', deliveryGood);
api.use('/deliveryclient', deliveryClient);

module.exports = api;