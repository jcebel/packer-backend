"use strict";
const ErrorHandler = require('./ErrorHandler');
const DeliveryGoodModel = require('../models/DeliveryGood');
const DriverModel = require('../models/Driver');
const RouteModel = require('../models/Route');
const UserModel = require('../models/User');
const DeliveryClientModel = require('../models/DeliveryClient');
const currentLoc = require('../services/mockLocationService');


const list = (req, res) => {
    UserModel.findById(req.userId)
        .populate({path: 'deliveryClient', populate: {path: 'goodsToDeliver'}})
        .select('goodsToDeliver')
        .exec()
        .then(user => {
            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });
            let delgoodArray=user.deliveryClient.goodsToDeliver;
            delgoodArray.sort(function(a, b) {
                a = new Date(a.deliveryDate);
                b = new Date(b.deliveryDate);
                return a>b ? -1 : a<b ? 1 : 0;
            });
            res.status(200).json(delgoodArray)
        }).catch(error => ErrorHandler.internalServerError(error,res));
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
        }).catch(error => ErrorHandler.internalServerError(error,res));
};

const readDeliveryDetails = (req, res) => {
    DeliveryGoodModel.findById(req.params.id).exec()
        .then(deliveryGood => {
            if (!deliveryGood) return res.status(404).json({
                error: 'Not Found',
                message: `Delivery good not found`
            });
            if(deliveryGood.deliveryState === "Waiting for Routing" || deliveryGood.deliveryState === "In Bidding Process"){
                let deliveryDetails = {
                    deliverygood: deliveryGood
                };
                return res.status(200).json(deliveryDetails);
            } else {
                //add Driver and Route Details
                RouteModel.find().byDelGoodId(req.params.id)
                    .select("vehicleType").exec()
                    .then(route => {
                        DriverModel.find().byRouteId(route[0]._id)
                            .exec()
                            .then(driver => {
                                UserModel.find({driver: driver[0]._id})
                                    .select("firstName")
                                    .then(user => {
                                        let deliveryDetails = {
                                            deliverygood: deliveryGood,
                                            vehicleType: route[0].vehicleType,
                                            driverName: user[0].firstName
                                        };
                                        res.status(200).json(deliveryDetails)
                                    }).catch(error => ErrorHandler.internalServerError(error, res));
                            }).catch(error => ErrorHandler.internalServerError(error, res));
                    }).catch(error => ErrorHandler.internalServerError(error, res));
            }
        }).catch(error => ErrorHandler.internalServerError(error,res));
};

const readDeliveryStatus = (req, res) => {
    DeliveryGoodModel.findById(req.params.id)
        .exec()
        .then(deliveryGood => {
            if (!deliveryGood) return res.status(404).json({
                error: 'Not Found',
                message: `Delivery good not found`
            });
            let deliveryStatus = {};
            const deliveryState = deliveryGood.deliveryState;
            if (deliveryState === "In Delivery") {
                deliveryStatus = {
                    deliveryState: deliveryState,
                    currentLoc: currentLoc()
                };
            } else if (deliveryState === "Delivered") {
                deliveryStatus = {
                    deliveryState: deliveryState,
                    currentLoc: deliveryGood.destination
                }
            } else {
                deliveryStatus = {
                    deliveryState: deliveryState,
                    currentLoc: deliveryGood.origination
                };
            }
            res.status(200).json(deliveryStatus);
        }).catch(error => ErrorHandler.internalServerError(error,res));
};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    DeliveryGoodModel.findByIdAndUpdate(req.params.id,req.body,
        {
            new: true,
            runValidators: true}).exec()
        .then(deliveryGood => {
            res.status(200).json(deliveryGood);
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
    readDeliveryDetails,
    readDeliveryStatus,
    update,
    remove
};
