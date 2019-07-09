"use strict";

const priceCalculation = (req, res) => {
    size = req.body.size;
    weight = req.body.weight;
    distance = req.body.distance;

    

    res.status(200).json({price : 0});
};

module.exports = {priceCalculation};