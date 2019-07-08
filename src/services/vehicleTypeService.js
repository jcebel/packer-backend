const calculateRouteIndex = function(items){
    let resIndex = 0;
    let weightIndex = 0;
    let sizeIndex = 0;

    items.forEach(function(elem) {
        if(elem.weight === "small"){
            weightIndex = 1;
        }
        if(elem.size === "small"){
            sizeIndex = 1;
        }

        if(elem.weight === "medium"){
            weightIndex = 5;
        }
        if(elem.size === "medium"){
            sizeIndex = 5;
        }

        if(elem.weight === "large"){
            weightIndex = 10;
        }
        if(elem.size === "large"){
            sizeIndex = 10;
        }

        resIndex += weightIndex * sizeIndex;
    });

    return resIndex;
};

const vehicleRecommendation = function(route){
    const routeIndex = calculateRouteIndex(route.items);
    if(routeIndex <= 8 && route.meters <= 15000){
        return "bike";
    }
    if(routeIndex <= 80){
        return "car";
    }
    if(routeIndex > 80){
        return "van";
    }
};

module.exports = vehicleRecommendation;