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
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    
    req.body.deliveryDate = new Date(Date.UTC(req.body.deliveryDate.getFullYear(),req.body.deliveryDate.getMonth(), req.body.deliveryDate.getDate()));
    
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

const read   = (req, res) => {
    DeliveryGoodModel.findById(req.params.id).exec()
        .then(deliveryGood => {

            if (!deliveryGood) return res.status(404).json({
                error: 'Not Found',
                message: `Delivery good not found`
            });

            res.status(200).json(deliveryGood)

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