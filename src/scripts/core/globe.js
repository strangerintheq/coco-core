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

earth.switchGlobe = function () {
    earth.globe = [alterGlobe, alterGlobe = earth.globe][0]; // swap globes
    earth.redraw();
};

module.exports = earth;