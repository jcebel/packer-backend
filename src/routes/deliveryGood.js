"use strict";

const express  = require('express');
const middleware = require('../middleware');
const router   = express.Router();
const DeliveryGoodController = require('../controllers/deliveryGood');

router.get('/', middleware.checkAuthentication, DeliveryGoodController.list);//List all delivery goods
router.post('/', middleware.checkAuthentication, DeliveryGoodController.create);//Add delivery good
router.get('/:id', middleware.checkAuthentication, DeliveryGoodController.readDeliveryDetails);//Search for delivery details by id
router.get('/:id/deliverystate', middleware.checkAuthentication, DeliveryGoodController.readDeliveryState);
router.delete('/:id',middleware.checkAuthentication, DeliveryGoodController.remove);//Delete document from db


module.exports = router;