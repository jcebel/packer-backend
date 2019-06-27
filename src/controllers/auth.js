"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const UserModel = require('../models/User');

const register = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});


    UserModel.create(user)
        .then(user => {
            const token = jwt.sign({ id: user._id, username: user.username }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});


        })
        .catch(error => {
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });
};


const login = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    UserModel.findOne({username: req.body.username}).exec()
        .then(user => {

            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) return res.status(401).send({token: null });

            const token = jwt.sign({ id: user._id, username: user.username }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});

        })
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));

};

const user = (req, res) => {
    UserModel.findById(req.userId).select('username').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};


module.exports = {
    register,
    login,
    user
};
