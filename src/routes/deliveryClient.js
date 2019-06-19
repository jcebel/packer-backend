"use strict";

const express  = require('express');
const router   = express.Router();

const DeliveryClientController = require('../controllers/deliveryClient');


router.get('/:id/goodstodeliver', DeliveryClientController.listDeliveryGoods);

module.exports = router;