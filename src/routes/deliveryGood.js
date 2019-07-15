"use strict";

const express  = require('express');
const middleware = require('../middleware');
const router   = express.Router();
const DeliveryGoodController = require('../controllers/deliveryGood');

router.get('/', middleware.checkAuthentication, DeliveryGoodController.list);
router.post('/', middleware.checkAuthentication, DeliveryGoodController.create);
router.get('/:id', middleware.checkAuthentication, DeliveryGoodController.read);
router.delete('/:id',middleware.checkAuthentication, DeliveryGoodController.remove);

module.exports = router;