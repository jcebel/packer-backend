"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middleware = require('./middleware');
const deliveryGood = require('./routes/deliveryGood');
const deliveryClient = require("./routes/deliveryClient");
const route = require("./routes/route");
const auth = require("./routes/auth");


const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middleware.allowCrossDomain);


api.get('/', (req, res) => {
    res.json({
        name: 'Packer Backend'
    });
});

api.use('/auth', auth);
api.use('/deliverygoods', deliveryGood);
api.use('/deliveryclient', deliveryClient);
api.use('/route', route);


module.exports = api;