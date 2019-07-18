"use strict";
const ErrorHandler = require('./ErrorHandler');
const DeliveryGoodModel = require('../models/DeliveryGood');
const DriverModel = require('../models/Driver');
const RouteModel = require('../models/Route');
const UserModel = require('../models/User');
const DeliveryClientModel = require('../models/DeliveryClient');

const getUsersDeliveryGoods = (req) => {
    return new Promise((resolve, reject) =>
        UserModel.findById(req.userId)
            .populate({path: 'deliveryClient', populate: {path: 'goodsToDeliver'}})
            .select('goodsToDeliver')
            .exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
    );
};

const list = (req, res) => {
    getUsersDeliveryGoods(req)
        .then(user => {
            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });
            let delgoodArray = user.deliveryClient.goodsToDeliver;
            delgoodArray.sort(function (a, b) {
                a = new Date(a.deliveryDate);
                b = new Date(b.deliveryDate);
                return a > b ? -1 : a < b ? 1 : 0;
            });
            res.status(200).json(delgoodArray)
        }).catch(error => ErrorHandler.internalServerError(error, res));
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
        }).catch(error => ErrorHandler.internalServerError(error, res));
};

const readDeliveryDetails = (req, res) => {
    getUsersDeliveryGoods(req).then(user => {
        if (hasUserThisDeliveryGood(user, req.params.id)) {
            DeliveryGoodModel.findById(req.params.id).exec()
                .then(deliveryGood => {
                    if (!deliveryGood) return res.status(404).json({
                        error: 'Not Found',
                        message: `Delivery good not found`
                    });
                    if (deliveryGood.deliveryState === "Waiting for Routing" || "In Bidding Process") {
                        let deliveryDetails = {
                            deliverygood: deliveryGood
                        };
                        return res.status(200).json(deliveryDetails);
                    } else {
                        //add Driver and Route Details
                        return RouteModel.find().byDelGoodId(req.params.id)
                            .select("vehicleType").exec()
                            .then(route => {
                                DriverModel.find().byRouteId(route[0]._id)
                                    .select("driverLicenseNumber").exec()
                                    .then(driver => {
                                        UserModel.find({driver: driver[0]._id})
                                            .select("firstName")
                                            .then(user => {
                                                let deliveryDetails = {
                                                    deliverygood: deliveryGood,
                                                    vehicleType: route[0].vehicleType,
                                                    driverName: user[0].firstName
                                                };
                                                return res.status(200).json(deliveryDetails)
                                            })
                                    })
                            })
                }
                })
        } else {
            return res.status(404).json({message: 'Not Authorized'});
        }
    }).catch(error => ErrorHandler.internalServerError(error, res));
};

const readDeliveryState = (req, res) => {
    getUsersDeliveryGoods(req)
        .then(user => {
            if (hasUserThisDeliveryGood(user, req.params.id)) {
                return DeliveryGoodModel.findById(req.params.id)
                    .select('deliveryState')
                    .exec()
                    .then(deliveryState => {
                        if (!deliveryState) return res.status(404).json({
                            error: 'Not Found',
                            message: `Delivery good not found`
                        });
                        return res.status(200).json(deliveryState);
                    });
            } else {
                return res.status(404).json({message: 'Not Authorized'});
            }
        })
        .catch(error => ErrorHandler.internalServerError(error, res));
};

const remove = (req, res) => {
    getUsersDeliveryGoods(req)
        .then(user => {
            if (hasUserThisDeliveryGood(user, req.params.id)) {
                return DeliveryGoodModel
                    .findByIdAndRemove(req.params.id).exec()
                    .then(() => res.status(200).json({message: `Delivery good with id${req.params.id} was deleted`}));
            } else {
                res.status(404).json({message: 'Not Authorized'});
            }
        })
        .catch(error => ErrorHandler.internalServerError(error, res));
};

const hasUserThisDeliveryGood = (user, id) => {
    return user
        && user.deliveryClient
        && user.deliveryClient.goodsToDeliver
        && user.deliveryClient.goodsToDeliver.find(item => item._id.toHexString() === id);
};

module.exports = {
    list,
    create,
    readDeliveryDetails,
    readDeliveryState,
    remove
};
