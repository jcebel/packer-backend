"use strict";

const express = require('express');
const middleware = require('../middleware');
const PriceService = require('../services/priceCalculation.js');

const router = express.Router();

router.post('/', middleware.checkAuthentication, PriceService.priceCalculation);

module.exports = router;