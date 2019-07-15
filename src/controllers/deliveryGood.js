"use strict";
const ErrorHandler = require('./ErrorHandler');
const DeliveryGoodModel = require('../models/DeliveryGood');
const DriverModel = require('../models/Driver');
const RouteModel = require('../models/Route');
const UserModel = require('../models/User');
const DeliveryClientModel = require('../models/DeliveryClient');

const internalServerError = (error, res) => res.status(500).json({
    error: 'Internal server error',
    message: error.message
});

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
            res.status(200).json(user.deliveryClient.goodsToDeliver)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
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

const readDeliveryDetails = (req, res) => {
    DeliveryGoodModel.findById(req.params.id).exec()
        .then(deliveryGood => {
            if (!deliveryGood) return res.status(404).json({
                error: 'Not Found',
                message: `Delivery good not found`
            });
            //add Driver and Route Details
            RouteModel.find().byDelGoodId(req.params.id)
                .select("vehicleType").exec()
                .then(route => {
                    DriverModel.find().byRouteId(route[0]._id)
                        .select("driverLicenseNumber").exec()
                        .then(driver => {
                            UserModel.find({driver: driver[0]._id})
                                .select("firstName")
                                .then(user => {
                                    let deliveryDetails = {};
                                    deliveryDetails.deliverygood = deliveryGood;
                                    deliveryDetails.vehicleType = route[0].vehicleType;
                                    deliveryDetails.driverLicenseNumber = driver[0].driverLicenseNumber;
                                    deliveryDetails.driverName = user[0].firstName;
                                    res.status(200).json(deliveryDetails)
                                }).catch(error => internalServerError(error, res));
                        }).catch(error => internalServerError(error, res));
                }).catch(error => internalServerError(error, res));
        }).catch(error => internalServerError(error, res));
};

const readDeliveryState = (req, res) => {
    DeliveryGoodModel.findById(req.params.id)
        .select('deliveryState')
        .exec()
        .then(deliveryState => {
            if (!deliveryState) return res.status(404).json({
                error: 'Not Found',
                message: `Delivery good not found`
            });
            res.status(200).json(deliveryState);
        }).catch(error => internalServerError(error, res));
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
    readDeliveryState,
    update,
    remove
};
