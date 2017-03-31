var RenderableLayer = require("../../node_modules/web-world-wind/src/layer/RenderableLayer");
var Sector = require("../../node_modules/web-world-wind/src/geom/Sector");
var SurfaceImage = require("../../node_modules/web-world-wind/src/shapes/SurfaceImage");

var SingleImageLayer = function (src) {
    RenderableLayer.call(this, "Single image layer");
    this.addRenderable(new SurfaceImage(Sector.FULL_SPHERE, src));
    this.minActiveAltitude = 0; // 3e6;
};

SingleImageLayer.prototype = Object.create(RenderableLayer.prototype);

module.exports = SingleImageLayer;