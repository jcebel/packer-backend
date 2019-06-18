"use strict";

const express  = require('express');
const router   = express.Router();

const DeliveryGoodController = require('../controllers/deliveryGood');

router.get('/', DeliveryGoodController.list);//List all delivery goods
router.post('/', DeliveryGoodController.create);

module.exports = router;