"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const UserModel = require('../models/User');
const DeliveryClientModel = require('../models/DeliveryClient');
const DriverModel = require('../models/Driver');
const internalServerError = require('./ErrorHandler').internalServerError;

const register = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain an email property'
    });

    let delClient;
    let driver;
    for (let i = 0; i < req.body.checkboxIds.length; i++) {
        if (req.body.checkboxIds[i] === "deliveryClient") {
            delClient = new DeliveryClientModel();
            req.body.deliveryClient = delClient._id;
        } else if (req.body.checkboxIds[i] === "driver") {
            driver = new DriverModel();
            req.body.driver = driver._id;
        }
    }

    delete req.body.checkboxIds;
    const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});

    if (typeof delClient !== "undefined" && typeof driver === "undefined") {
        delClient.save().then(() => {
            createUserModel(user, res);
        }).catch(error => internalServerError(error, res))
    } else if (typeof delClient === "undefined" && typeof driver !== "undefined") {
        driver.save().then(() => {
            createUserModel(user, res);
        }).catch(error => internalServerError(error, res))
    } else if (typeof delClient !== "undefined" && typeof driver !== "undefined") {
        delClient.save().then(() => {
            driver.save().then(() => {
                createUserModel(user, res)
            }).catch(error => internalServerError(error, res))
        }).catch(error => internalServerError(error, res))
    }
};

const createUserModel = (user, res) => {
    UserModel.create(user)
        .then(user => {
            const token = jwt.sign({id: user._id, email: user.email}, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({token: token});
        })
        .catch(error => {
            if (error.code === 11000) {
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            } else {
                internalServerError(error, res);
            }
        });
};

const login = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain an email property'
    });

    UserModel.findOne({email: req.body.email}).exec()
        .then(user => {

            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) return res.status(401).send({token: null});

            const token = jwt.sign({id: user._id, email: user.email}, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});

        })//TODO is 404 a correct message code?
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));

};

const user = (req, res) => {
    UserModel.findById(req.userId).exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json({
                name: user.name,
                firstName: user.firstName,
                email: user.email,
                birthday: user.birthday,
                driver: !!user.driver,
                deliveryClient: !!user.deliveryClient
            })
        })
        .catch((err) => internalServerError(err, res));
};

const logout = (req, res) => {
    res.status(200).send({token: null});
};


module.exports = {
    register,
    login,
    user,
    logout
};
