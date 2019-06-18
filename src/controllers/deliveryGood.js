"use strict";

const DeliveryGoodModel = require('../models/DeliveryGood');

const list  = (req, res) => {
    DeliveryGoodModel.find({}).exec()
        .then(deliverygoods => res.status(200).json(deliverygoods))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const create = (req, res) => {

    DeliveryGoodModel.create(req.body)
        .then(deliveryGood => {
            res.status(201).json(deliveryGood);
            console.log("Added successfully:");
            console.log(deliveryGood);
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};



module.exports = {
    list,
    create
};