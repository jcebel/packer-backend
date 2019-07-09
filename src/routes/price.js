"use strict";

const express  = require('express');
const router   = express.Router();

const PriceService = require('../services/priceCalculation.js');

router.get('/', PriceService.priceCalculation);//get Price



module.exports = router;