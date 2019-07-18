"use strict";

const express  = require('express');
const router   = express.Router();
const DeliveryGoodController = require('../controllers/deliveryGood');
const middleware    = require('../middleware');

router.get('/', middleware.checkAuthentication, DeliveryGoodController.list);//List all delivery goods
router.post('/', middleware.checkAuthentication, DeliveryGoodController.create);//Add delivery good
router.get('/:id', middleware.checkAuthentication, DeliveryGoodController.readDeliveryDetails);//Search for delivery details by id
router.get('/:id/deliverystatus', middleware.checkAuthentication, DeliveryGoodController.readDeliveryStatus);
router.put('/:id', DeliveryGoodController.update);//Update existing document
router.patch('/:id', DeliveryGoodController.update);//Update existing document TODO: Find out if it is better to use put or patch
router.delete('/:id',DeliveryGoodController.remove);//Delete document from db

module.exports = router;