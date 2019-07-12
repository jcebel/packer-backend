"use strict";
const GoogleService  = require("./GoogleService");






const priceCalculation = (req, res) => {


    


    const size = req.body.size;
    const weight = req.body.weight;
    const orig = req.body.orig;
    const dest = req.body.dest;
    let distance = 0;
    let price = 1;

    GoogleService.getDistanceMatrix([orig], [dest], 'driving')
    .then((data) => {
        //console.log(data.rows[0].elements[0].distance.value);
        //console.log(data.rows[0].elements);
        distance = data.rows[0].elements[0].distance.value;
        distance = distance / 1000;
        price = price + (distance * 0.15);
        price = Math.round( price * 10) / 10;
        //console.log(distance);
        //console.log(price);
        res.status(200).json({price : price});
        //return distance;
    }).catch((e) => {
        console.log(e);
    });
    

    

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
    
    //console.log(distance);
    

   
};

module.exports = {priceCalculation};