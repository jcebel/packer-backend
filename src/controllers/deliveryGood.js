"use strict";
const ErrorHandler = require('./ErrorHandler');
const DeliveryGoodModel = require('../models/DeliveryGood');
const UserModel = require('../models/User');
const DeliveryClientModel = require('../models/DeliveryClient');

const list  = (req, res) => {
    DeliveryGoodModel.find({}).exec()
        .then(deliverygoods => res.status(200).json(deliverygoods))
        .catch(error => ErrorHandler.internalServerError(error,res));
};

const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    let delGoodId;
    DeliveryGoodModel.create(req.body)
        .then(deliveryGood => {
            res.status(201).json(deliveryGood);
            delGoodId = deliveryGood._id;
        })
        .then(() => {
            UserModel.findById(req.userId).select("deliveryClient").exec()
                .then(client => {
                    DeliveryClientModel.findById(client.deliveryClient).exec()
                        .then((deliveryClient) => {
                            deliveryClient.goodsToDeliver.push(delGoodId);
                            deliveryClient.save();
                        })
                })
        })
        .catch(error => ErrorHandler.internalServerError(error,res));
};

const read   = (req, res) => {
    DeliveryGoodModel.findById(req.params.id).exec()
        .then(deliveryGood => {

            if (!deliveryGood) return res.status(404).json({
                error: 'Not Found',
                message: `Delivery good not found`
            });

            res.status(200).json(deliveryGood)

        })
        .catch(error => ErrorHandler.internalServerError(error,res));

};

const remove = (req, res) => {
    DeliveryGoodModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Delivery good with id${req.params.id} was deleted`}))
        .catch(error =>ErrorHandler.internalServerError(error,res));
};

module.exports = {
    list,
    create,
    read,
    remove
};