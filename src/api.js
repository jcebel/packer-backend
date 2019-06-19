"use strict";

const express    = require('express');
const bodyParser = require('body-parser');

const deliveryGood = require('./routes/deliveryGood');
const deliveryClient = require("./routes/deliveryClient");
const route = require("./routes/route");


const api = express();

api.use(bodyParser.json());


api.get('/', (req, res) => {
    res.json({
        name: 'Packer Backend'
    });
});

api.use('/deliverygoods', deliveryGood);
api.use('/deliveryclient', deliveryClient);
api.use('/route', route);


module.exports = api;