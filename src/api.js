"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middleware = require('./middleware');
const deliveryGood = require('./routes/deliveryGood');
const route = require("./routes/route");
const auth = require("./routes/auth");
const user = require("./routes/user");
const price = require("./routes/price");
const cors = require("cors");


const api = express();

// Adding Basic Middlewares
api.use(cors());
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));


api.get('/', (req, res) => {
    res.json({
        name: 'Packer Backend'
    });
});

api.use('/auth', auth);
api.use('/deliverygoods', deliveryGood);
api.use('/route', route);
api.use('/user', user);
api.use('/price', price);


module.exports = api;