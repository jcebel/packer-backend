"use strict";

const express  = require('express');
const router   = express.Router();
const middleware = require('../middleware');

const RouteController = require('../controllers/route');

router.get('/ofToday', RouteController.listOfToday); //list Of Today's Routes
router.get('/:id', middleware.checkAuthentication, RouteController.read);//Search for route by id
router.put('/:id',middleware.checkAuthentication, RouteController.updateBid);//add new bid to route

module.exports = router;