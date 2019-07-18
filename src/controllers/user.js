"use strict";

const UserModel = require('../models/User');
const ErrorHandler = require('./ErrorHandler');

const getDriverID = (req, res) => {
    UserModel.findById(req.userId).exec().then( user => {
        res.status(200).json(user.driver);
        }).catch(error => ErrorHandler.internalServerError(error, res));
};

module.exports = {
    getDriverID
};