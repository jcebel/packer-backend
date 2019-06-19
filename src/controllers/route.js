"use strict";

const routeModel = require('../models/Route');

const list  = (req, res) => {
    routeModel.find({}).exec()
        .then(routes => res.status(200).json(routes))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    list
};