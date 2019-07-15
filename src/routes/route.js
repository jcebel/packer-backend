"use strict";

const express  = require('express');
const router   = express.Router();
const middleware = require('../middleware');

const RouteController = require('../controllers/route');

router.get('/', middleware.checkAuthentication, RouteController.list);//List all routes //TODO Delete
router.get('/byDate/:date', RouteController.listByDate); //List by date
router.get('/:id', middleware.checkAuthentication, RouteController.read);//Search for route by id
router.put('/:id',middleware.checkAuthentication, RouteController.updateBid);//add new bid to route

module.exports = router;