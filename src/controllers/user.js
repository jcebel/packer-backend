"use strict";

const UserModel = require('../models/User');
const ErrorHandler = require('./ErrorHandler');

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
        .catch(error => ErrorHandler.internalServerError(error,res));
};
const isDriver = (req, res) => {
    UserModel.findById(req.userId).exec().then( user => {
            if(user && user.driver) {
                res.status(200).json({isDriver:true});
            } else  {
                res.status(200).json({isDriver:false});
            }
        }
    ).catch(error => ErrorHandler.internalServerError(error,res));
};

const getDriverID = (req, res) => {
    UserModel.findById(req.userId).exec().then( user => {
        res.status(200).json(user.driver);
        }).catch(error => res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
    }));
};



module.exports = {
    listDeliveryGoods,
    isDriver,
    getDriverID
};