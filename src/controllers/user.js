"use strict";

const UserModel = require('../models/User');

const listDeliveryGoods = (req, res) => {
    UserModel.findById(req.params.id)
        .populate({path: 'deliveryClient', populate: {path: 'goodsToDeliver'}})
        .select('goodsToDeliver')
        .exec()
        .then(delGoods => {
            if (!delGoods) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });
            res.status(200).json(delGoods.deliveryClient.goodsToDeliver)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

module.exports = {
    listDeliveryGoods
};