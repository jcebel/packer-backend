"use strict";

const DeliveryGoodModel = require('../models/DeliveryClient');

const listDeliveryGoods = (req, res) => {
    DeliveryGoodModel.findById(req.params.id).select('goodsToDeliver').exec()
        .then(delGoods => {
            if (!delGoods) return res.status(404).json({
                error: 'Not Found',
                message: `Delivery Client not found`
            });
            res.status(200).json(delGoods)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

module.exports = {
    listDeliveryGoods
};