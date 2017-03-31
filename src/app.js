WorldWind = require("./constants");

WorldWind.configuration = {
    gpuCacheSize: 250e6,
    baseUrl:  './'
};

var WorldWindow = require('../node_modules/web-world-wind/src/WorldWindow');
var AtmosphereLayer = require('../node_modules/web-world-wind/src/layer/AtmosphereLayer');
//var LocalTiledImageLayer = require('../node_modules/web-world-wind/src/layer/LocalTiledImageLayer');
var SingleImageLayer = require('./layer/SingleImageLayer');
var Globe3D = require('../node_modules/web-world-wind/src/globe/Globe');
var Globe2D = require('../node_modules/web-world-wind/src/globe/Globe2D');
var EarthElevationModel = require('../node_modules/web-world-wind/src/globe/EarthElevationModel');
var ZeroElevationModel = require('../node_modules/web-world-wind/src/globe/ZeroElevationModel');
var Position = require('../node_modules/web-world-wind/src/geom/Position');

var canvas = document.createElement('canvas');

canvas.id = 'ww-canvas';
canvas.width = 800;
canvas.height = 600;
canvas.style.width = '100%';
canvas.style.height  = '100%';
canvas.style.backgroundColor = 'black';

var container = document.createElement('div');
container.style.width = '100%';
container.style.height = '100%';
container.style.position = 'absolute';
container.appendChild(canvas);
document.documentElement.appendChild(container);

var switchGlobe = new Globe2D();
var earth = new WorldWindow('ww-canvas', new Globe3D(new ZeroElevationModel(), null));

earth.addLayer(new SingleImageLayer('day.jpg'));
//earth.addLayer(new LocalTiledImageLayer());
earth.addLayer(new AtmosphereLayer('night.png', null));

var changeMode = document.createElement('div');
changeMode.style.width = '30px';
changeMode.style.height = '30px';
changeMode.style.margin = '5px';
changeMode.style.border = '2px solid white';
changeMode.style.zIndex = '1000';
changeMode.style.borderRadius = '30px';
changeMode.style.position = 'absolute';

changeMode.onclick = function() {
    var tmp = switchGlobe;
    switchGlobe = earth.globe;
    earth.globe = tmp;
    earth.redraw();
};

document.documentElement.appendChild(changeMode);
earth.redraw();