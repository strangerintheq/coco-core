var events = require('../core/events');

initButton("switch-globe");

function initButton(id) {
    document.querySelector("#" + id).onclick = function() {
        events.post(events.SWITCH_GLOBE, {
            parameter: id
        });
    };
}
