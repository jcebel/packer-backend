"use strict";

const express  = require('express');
const router   = express.Router();
const middleware = require('../middleware');

const RouteController = require('../controllers/route');

router.get('/ofToday', RouteController.listOfToday); //list Of Today's Routes
router.get('/:id', middleware.checkAuthentication, RouteController.read);//Search for route by id
router.get('/startDriving/:id', middleware.checkAuthentication, RouteController.startDriving);
router.put('/:id',middleware.checkAuthentication, RouteController.updateBid);//add new bid to route

module.exports = router;