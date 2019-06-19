"use strict";

const express  = require('express');
const router   = express.Router();

const DeliveryGoodController = require('../controllers/deliveryGood');

router.get('/', DeliveryGoodController.list);//List all delivery goods
router.post('/', DeliveryGoodController.create);//Add delivery good
router.get('/:id', DeliveryGoodController.read);//Search for delivery good by id

module.exports = router;