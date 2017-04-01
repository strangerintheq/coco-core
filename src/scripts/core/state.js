var events = require('./events');
var carriersData = require('./data/carriers');
var request = require('./data/request');

var selectedLaunch;


module.exports = function () {
    return selectedLaunch;
};

module.exports.getCarrier = function(id) {
    return selectedLaunch.carriers.filter(function(c){
        return c.carrierId == id;
    })[0];
};


events.listen('clear', function() {
    selectedLaunch = null;
});

events.listen('open-launch', function(launch) {
    selectedLaunch = launch;
});

events.listen('carrier-state', function(state) {
    var carrier = getOrCreateCarrier(state.id);
    carrier.enabled = state.enabled;
});

events.listen('save', function() {
    if (selectedLaunch) {
        request
            .post('/launches/save')
            .onResponse(function(carriers) {
                selectedLaunch.carriers = carriers;
            })
            .send(selectedLaunch.carriers);
    }
});



function clear() {
    selectedLaunch = null;
}

function getOrCreateCarrier(id) {
    var carrier = selectedLaunch.carriers.filter(function(c) {
        return c.carrierId == id;
    });
    if (carrier.length == 0) {
        var carrierData = carriersData.get(id);
        var state = {
            carrierId: parseInt(id),
            launchId: selectedLaunch.summary.id,
            course: carrierData.course,
            speed: carrierData.speed,
            location: carrierData.location
        };
        selectedLaunch.carriers.push(state);
        return state;
    }
    return carrier[0];
}