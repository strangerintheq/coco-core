var WorldWindow = require('../../../node_modules/web-world-wind/src/WorldWindow');
var AtmosphereLayer = require('../../../node_modules/web-world-wind/src/layer/AtmosphereLayer');
//var HttpTiledImageLayer = require('../layer/HttpTiledImageLayer');
var SingleImageLayer = require('../layer/SingleImageLayer');
var Globe3D = require('../../../node_modules/web-world-wind/src/globe/Globe');
var Globe2D = require('../../../node_modules/web-world-wind/src/globe/Globe2D');
//var EarthElevationModel = require('../../../node_modules/web-world-wind/src/globe/EarthElevationModel');
var ZeroElevationModel = require('../../../node_modules/web-world-wind/src/globe/ZeroElevationModel');

var mainGlobe = new Globe3D(new ZeroElevationModel(), null);
var alterGlobe = new Globe2D();

var earth = new WorldWindow('canvas', mainGlobe);
earth.addLayer(new SingleImageLayer('day.jpg'));
//earth.addLayer(new HttpTiledImageLayer('localhost'));
earth.addLayer(new AtmosphereLayer('night.png'));
earth.redraw();

watch(earth.navigator, 'heading', navigatorStateChanged);
watch(earth.navigator, 'tilt', navigatorStateChanged);
watch(earth.navigator, 'range', navigatorStateChanged);

var events = require('./events');

events.listen(events.SWITCH_GLOBE, function () {
    earth.globe = [alterGlobe, alterGlobe = earth.globe][0]; // swap globes
    earth.redraw();
});

var rotationInterval;
var directions = ['up', 'down', 'left', 'right'];
events.listen(events.CONTROLS_CHANGED, function(state) {

    var loc = earth.navigator.lookAtLocation;
    var param = state.parameter;

    if (directions.indexOf(param) > -1) {
        handleArrow();
    } else {
        earth.navigator[param] = state.value;
        earth.redraw();
    }

    function handleArrow() {

        var amount = 0.07 * earth.navigator.range / 1e6;
        var sign = 'up' == param || 'right' == param ? 1 : -1;
        var horizontal = 'left' == param || 'right' == param;

        if (state.value) {
            clearInterval(rotationInterval);
            rotationInterval = setInterval(rotate, 25);
        } else {
            clearInterval(rotationInterval);
        }

        function rotate() {
            loc[horizontal ? 'longitude' : 'latitude'] += sign * amount;
            earth.redraw();
        }
    }
});

events.listen(events.ROTATE_TO, function (state) {

});

function navigatorStateChanged(value, parameter) {
    var state = {};
    state[parameter] = value;
    events.post(events.NAVIGATOR_STATE_CHANGED, state);
}

function watch(object, propertyName, callback) {

    var oldValue = object[propertyName];

    var newValue = oldValue;

    Object.defineProperty(object, propertyName, {
        get: getter,
        set: setter
    });

    function getter() {
        return newValue;
    }

    function setter(val) {
        oldValue = newValue;
        if (oldValue != val) {
            callback(val, propertyName);
        }
        return newValue = val;
    }
}