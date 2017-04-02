var dom = require('free-dom');

module.exports = createField;
module.exports.cfg = createConfig;

function createField(cfg) {

    var field = dom.div('form-field');

    field.cfg = cfg;

    dom.div('form-field-title').html(cfg.title + ':').appendTo(field);
    var value = dom.div('form-field-value').appendTo(field);

    field.set = function(text) {
        value.html(text);
    };

    field.render = function(data) {
        var val = cfg.custom.provider ? cfg.custom.provider(data) : deepValue(data, cfg.path);
        if (cfg.custom.renderer) {
            cfg.custom.renderer(val, value, data);
        } else {
            value.innerHTML = null == val ? '-' : val;
        }
    };

    if (cfg.custom.style) {
        for (var property in cfg.custom.style) {
            if (cfg.custom.style.hasOwnProperty(property)) {
                field.style[property] = cfg.custom.style[property];
            }
        }
    }

    return field;
}


function deepValue(obj, path) {
    try {
        path = path.split('.');
        for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }
        return obj;
    } catch (e) {
        return null;
    }
}

function createConfig(title, path, style) {

    const cfg = {
        title: title,
        path: path,
        custom: {
            style: style
        }
    };

    cfg.style = createCustom('style');
    cfg.provider = createCustom('provider');
    cfg.renderer = createCustom('renderer');
    cfg.onclick = createCustom('onclick');

    return cfg;

    function createCustom(property) {
        return function(value) {
            cfg.custom[property] = value;
            return cfg;
        };
    }
}
