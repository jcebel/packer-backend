"use strict";

const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const AuthController = require('../controllers/auth');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.put('/updateType', middleware.checkAuthentication, AuthController.updateType);
router.get('/user', middleware.checkAuthentication, AuthController.user);
router.get('/logout', middleware.checkAuthentication, AuthController.logout);

module.exports = router;