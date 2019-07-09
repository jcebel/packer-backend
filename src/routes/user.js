"use strict";

const express  = require('express');
const router   = express.Router();

const UserController= require('../controllers/user');


router.get('/:id/goodstodeliver', UserController.listDeliveryGoods);

module.exports = router;