"use strict";

const express  = require('express');
const router   = express.Router();

const RouteController = require('../controllers/route');

router.get('/', RouteController.list);//List all routes
router.get('/:id', RouteController.read);//Search for route by id
router.put('/:id', RouteController.update);//Update existing document


module.exports = router;