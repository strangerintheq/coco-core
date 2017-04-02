var events = require('../core/events');
var dom = require('free-dom');

var size = 160;
var half = size/2;

var startY, startAngle, dragType;

var knobs = {
    heading: initKnob('heading'),
    tilt: initKnob('tilt'),
    zoom: initKnob('range')
};

var svg = dom.select('#controls-svg');

module.exports = svg;

dom.all('path.arrow').forEach(initArrow);

dom.select('#controls-globe').click(function() {
    events.post('rotate', {heading: 0, tilt: 0})
});

events.listen(events.NAVIGATOR_STATE_CHANGED, function(state) {

    if (dragType) { // prevents handling of navigator changes when dragging
        return;
    }

    if (null != state.heading) {
        setHeading(-state.heading);
    }

    if (null != state.tilt) {
        setTilt(state.tilt/90 * size - half);
    }

    if (null != state.range) {
        var z = (1e5 + state.range)/20e6 * size - half
        if (Math.abs(z) > half) {
            z = Math.sign(z) * half;
        }
        setZoom(z);
    }
});

function send(value, id) {
    events.post(events.CONTROLS_CHANGED, {
        parameter: id ? id : dragType,
        value: value
    });
}

function onMouseMove(e) {

    if (dragType == 'heading') {
        var angle = startAngle + mouseAngle(e);
        setHeading(angle);
        send(-angle);
        return;
    }

    var y = startY + mouseY(e);
    if (Math.abs(y) > half) {
        y = Math.sign(y) * half;
    }

    if (dragType == 'tilt') {
        setTilt(y);
        send((y + half)/size*90); //
        return;
    }

    if (dragType == 'range') {
        setZoom(y);
        send(1e5 + (y + half)/size*20e6); //
    }
}

function onMouseDown(e) {
    dragType = getId(this.id);

    if (dragType == 'heading') {
        startAngle = headingKnobCurrentAngle() - mouseAngle(e);
    } else {
        startY = knobCurrentY(this) - mouseY(e);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function knobCurrentY(knob) {
    return parseFloat(knob.getAttribute('transform').split(/\(|\)/)[1].split(' ')[1]);
}

function headingKnobCurrentAngle() {
    return parseFloat(knobs.heading.parentNode.getAttribute('transform').split(/\(|\)/)[1]);
}

function setHeading(deg) {
    knobs.heading.parentNode.setAttribute('transform', 'rotate(' + deg + ')');
}

function setZoom(value) {
    knobs.zoom.setAttribute('transform', 'translate(100 ' + value + ')');
}

function setTilt(value) {
    knobs.tilt.setAttribute('transform', 'translate(-100 ' + value + ')');
}

function initKnob(type) {
    var knob = dom.select('#controls-' + type + '-knob');
    knob.addEventListener('mousedown', onMouseDown);
    return knob;
}

function mouseAngle(e) {
    return rad2deg(Math.PI - Math.atan2(mouseX(e), mouseY(e)));
}

function mouseY(e) {
    return e.clientY - getOffset(svg.parentNode, 'offsetTop') - svg.clientHeight / 2;
}

function mouseX(e) {
    return e.clientX - getOffset(svg.parentNode, 'offsetLeft') - svg.clientWidth / 2;
}

function rad2deg(rad) {
    return rad / Math.PI * 180;
}

function deg2rad(deg) {
    return deg / 180 * Math.PI;
}

function onMouseUp() {
    dragType = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

function getOffset(elem, offsetParam) {
    var offset = elem[offsetParam];
    if (elem.offsetParent) {
        offset += getOffset(elem.offsetParent, offsetParam);
    }
    return offset;
}

function initArrow(arrow) {

    const id = getId(arrow.id);

    arrow.addEventListener('mousedown', activate);

    function deactivate() {
        document.removeEventListener('mouseup', deactivate);
        send(false, id)
    }

    function activate() {
        document.addEventListener('mouseup', deactivate);
        send(true, id);
    }

}

function getId(id) {
    return id.split('-')[1];
}
