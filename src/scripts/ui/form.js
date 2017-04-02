var dom = require('free-dom');
var field = require('./field');
var events = require('../core/events');

module.exports = function(id, title) {

    var form = dom.div('form');

    form.oncontextmenu = function(event) {
        return false;
    };

    if (typeof title == 'string') {
        title = dom.div('form-title').html(title).appendTo(form);
    } else if (title) {
        form.append(title)
    }

    var fields = {};
    form.fields = fields;

    var content = dom.div('form-content').appendTo(form);

    form.add = function(element) {
        content.append(element);
        return form;
    };

    form.addFields = function(configs, namespace) {
        namespace = namespace || 'default';
        fields[namespace] = [];
        configs.forEach(function(config) {
            var f = field(config);
            form.add(f);
            if (config.path) {
                fields[namespace].push(f);
            }
        });
        return form;
    };

    form.render = function(data, namespace) {
        namespace = namespace || 'default';
        if (fields[namespace]) {
            fields[namespace].forEach(function(f) {
                f.render(data);
            });
        }
        return form;
    };

    form.getField = function(path, namespace) {
        namespace = namespace || 'default';
        return fields[namespace].filter(function(field) {
            return path == field.cfg.path;
        })[0];
    };

    form.addMinimizeButton = function(component){

        var minimize = dom.div('form-top-button').click(function() {
            form.classList.add('form-minimized');
            minimize.classList.add('hidden');
            if (component) {
                component.classList.add('hidden');
            }
        }).appendTo(form).append(createMinimizeSvg());

        title.click(function() {
            form.classList.remove('form-minimized');
            minimize.classList.remove('hidden');
            if (component) {
                component.classList.remove('hidden');
            }
        });

        return form;
    };

    form.addCloseButton = function() {
        dom.div('form-top-button')
            .click(form.hide)
            .appendTo(form)
            .append(createCloseSvg());
        return form;
    };

    form.show = function() {
        form.classList.add('visible');
        return form;
    };
    form.hide = function() {
        form.classList.remove('visible');
        return form;
    };
    form.toggle = function() {
        return form.classList.contains('visible') ? form.hide() : form.show();
    };

    form.clear = function() {
        content.innerHTML = "";
        return form;
    };

    form.id = id;

    events.listen(events.SHOW_FORM, function (name) {
        if (name == id) form.show();
    });
    events.listen(events.HIDE_FORM, function (name) {
        if (name == id) form.hide();
    });
    events.listen(events.TOGGLE_FORM, function (name) {
        if (name == id) form.toggle();
    });


    var initX, initY, mousePressX, mousePressY;

    title.addEventListener('mousedown', function(event) {

        initX = form.offsetLeft;
        initY = form.offsetTop;

        form.classList.remove('form-transition');

        mousePressX = event.clientX;
        mousePressY = event.clientY;

        window.addEventListener('mousemove', repositionElement, false);

        window.addEventListener('mouseup', function() {
            window.removeEventListener('mousemove', repositionElement, false);
            form.classList.add('form-transition');
        }, false);

    }, false);

    function repositionElement(event) {
        form.style.left = initX + event.clientX - mousePressX + 'px';
        form.style.top = initY + event.clientY - mousePressY + 'px';
    }

    return form;
};

function createMinimizeSvg() {
    return svg().append(path("M5,15 H16"));
}

function createCloseSvg() {
    return svg().append(path("M5,5 L16,16 M5,16 L16,5"));
}

function path(d){
    return dom.path({
        d: d,
        stroke: "lightgray",
        "stroke-width": 3
    });
}

function svg() {
    return dom.svg({
        width: 21,
        height: 21,
        viewbox: "0 0 25 25"
    });
}