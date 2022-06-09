const getRecommendedStation = (stations) => {
    let cheapest;

    for (station of stations) {
        if (!cheapest) {
            cheapest = station;
        }

        if (station.price === cheapest.price) {
            if(station.distance < cheapest.distance) {
                cheapest = station;
            }
        }
        if (station.price < cheapest.price) {
            cheapest = station;
        }
    }
    return cheapest
};


module.exports = getRecommendedStation;