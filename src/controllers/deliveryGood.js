"use strict";

const DeliveryGoodModel = require('../models/DeliveryGood');
const DriverModel = require('../models/Driver');
const RouteModel = require('../models/Route');

const internalServerError = (error, res) => res.status(500).json({
    error: 'Internal server error',
    message: error.message
});

const list  = (req, res) => {
    DeliveryGoodModel.find({}).exec()
        .then(deliverygoods => res.status(200).json(deliverygoods))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

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

const read = (req, res) => {
    DeliveryGoodModel.findById(req.params.id).exec()
        .then(deliveryGood => {
            if (!deliveryGood) return res.status(404).json({
                error: 'Not Found',
                message: `Delivery good not found`
            });

            //add Driver and Route Details
            RouteModel.find().byDelGoodId("5d286e9fae02f13a98938018").exec()
                .then(route => {
                    DriverModel.find().byRouteId(route[0]._id).exec()
                        .then( driver =>
                            {
                                // console.log(driver[0].vehicle);
                                // console.log(deliveryGood);
                                let deliveryDetails = {};
                                deliveryDetails.deliveryGood = deliveryGood;
                                deliveryDetails.driverLicenseNumber = driver[0].driverLicenseNumber;
                                // deliveryDetails.driver.vehicle = driver[0].vehicle;
                                deliveryDetails.route = route;
                                console.log(deliveryDetails);
                                res.status(200).json(deliveryDetails)
                            }
                        )
                        .catch(error => internalServerError(error, res));
                });

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

//TODO: find out, if it is better to use updateOne or findByIdAndUpdate

/*    DeliveryGoodModel.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    ).exec()
        .then(deliveryGood => {
            res.status(200).json(deliveryGood);
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));*/

    DeliveryGoodModel.findByIdAndUpdate(req.params.id,req.body,
        {
            new: true,
            runValidators: true}).exec()
        .then(deliveryGood => {
            res.status(200).json(deliveryGood);
            console.log(req.body);
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    DeliveryGoodModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Delivery good with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    list,
    create,
    read,
    update,
    remove
};