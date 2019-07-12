"use strict";

const express  = require('express');
const router   = express.Router();
const middlerware = require('../middleware');

const UserController= require('../controllers/user');


router.get('/:id/goodstodeliver', UserController.listDeliveryGoods);

router.get('/isDriver', middlerware.checkAuthentication, UserController.isDriver);

module.exports = router;