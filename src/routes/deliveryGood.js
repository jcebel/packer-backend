"use strict";

const express  = require('express');
const middleware = require('../middleware');
const router   = express.Router();

const DeliveryGoodController = require('../controllers/deliveryGood');

router.get('/', DeliveryGoodController.list);//List all delivery goods //TODO: Delete
router.post('/', DeliveryGoodController.create);//Add delivery good
router.get('/:id', DeliveryGoodController.read);//Search for delivery good by id // TODO: Delete
router.put('/:id', DeliveryGoodController.update);//Update existing document //TODO: Delete
router.patch('/:id', DeliveryGoodController.update);//Update existing document TODO: Delete
router.delete('/:id',DeliveryGoodController.remove);//Delete document from db

module.exports = router;