var MercatorTiledImageLayer = require('../../node_modules/web-world-wind/src/layer/MercatorTiledImageLayer');
var Angle = require('../../node_modules/web-world-wind/src/geom/Angle');
var Color = require('../../node_modules/web-world-wind/src/util/Color');
var Location = require('../../node_modules/web-world-wind/src/geom/Location');
var Sector = require('../../node_modules/web-world-wind/src/geom/Sector');

var limit = 85.05;

var defaultConfig = {
    name: 'hyb',
    ds: 'sat,Both',
    suffix: 'jpg',
    server: 'localhost',
    maxLvl: 10
};

var HttpTiledImageLayer = function (ds) {
    var self = this;

    this.imageSize = 256;
    this.dataset = ds || defaultConfig;

    MercatorTiledImageLayer.call(
        this,
        new Sector(-limit, limit, -180, 180),
        new Location(limit, 180),
        this.dataset.maxLvl,
        'image/jpg',
        this.dataset.name,
        this.imageSize,
        this.imageSize
    );

    this.displayName = 'HttpTiledImageLayer';

    this.urlBuilder = {
        urlForTile: function (tile, imageFormat) {
            return formatUrl (
                self.dataset.server,
                self.dataset.ds,
                tile.level.levelNumber + 1,
                tile.column,
                tile.row,
                self.dataset.suffix
            );
        }
    };

    function formatUrl(tileServer, dataSet, level, row, col, suffix) {
        return "http://" + tileServer + "/tile/?dataset=" + dataSet + "&z=" + level + "&x=" + row + "&y=" + col + "&suffix=." + suffix;
    }
};

HttpTiledImageLayer.prototype = Object.create(MercatorTiledImageLayer.prototype);

// HttpTiledImageLayer.prototype.doRender = function (dc) {
//     MercatorTiledImageLayer.prototype.doRender.call(this, dc);
//     if (this.inCurrentFrame) {
//         // dc.screenCreditController.addStringCredit(defaultName, Color.DARK_GRAY);
//     }
// };

HttpTiledImageLayer.prototype.createTopLevelTiles = function (dc) {
    var self = this;

    self.topLevelTiles = [
        [0, 0], [0, 1],
        [1, 0], [1, 1]
    ].map(function (xy) {
        return self.createTile(null, self.levels.firstLevel(), xy[0], xy[1]);
    });

};

// Определяет размер карты для указанного номера уровня.
HttpTiledImageLayer.prototype.mapSizeForLevel = function (levelNumber) {
    return 256 << (levelNumber + 1);
};

module.exports = HttpTiledImageLayer;
