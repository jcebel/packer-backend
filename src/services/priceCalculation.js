"use strict";

const priceCalculation = (req, res) => {
    size = req.body.size;
    weight = req.body.weight;
    distance = req.body.distance;

    var price = 1;

    if(size == "Small") {
        price = price + 1;
    } else if(size == "Medium") {
        price = price + 2;
    } else if(size == "Large") {
        price = price + 3;
    }
    if(weight == "Light") {
        price = price + 1;
    } else if(weight == "Medium") {
        price = price + 2;
    } else if (weight == "Heavy") {
        price = price + 3;
    }
    if(distance <= 8 ) {
        price = price + (distance * 0.15);
    } else if(distance > 8 && distance <= 16) {
        price = price + (distance * 0.15);
    } else if (distance > 16) {
        price = price + (distance * 0.15);
    }

    res.status(200).json({price : price});
};

module.exports = {priceCalculation};