"use strict";

const express  = require('express');
const router   = express.Router();
const middleware = require('../middleware');
const UserController= require('../controllers/user');


router.get('/:id/goodstodeliver', UserController.listDeliveryGoods);
router.get('/driverID', middleware.checkAuthentication, UserController.getDriverID);


router.get('/isDriver', middleware.checkAuthentication, UserController.isDriver);

module.exports = router;