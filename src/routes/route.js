"use strict";

const express  = require('express');
const router   = express.Router();

const routeController = require('../controllers/route');

router.get('/', routeController.list);//List all delivery goods

module.exports = router;