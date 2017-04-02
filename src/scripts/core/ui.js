var events = require('./events');

initButton("switch-globe");

function initButton(id) {
    document.querySelector("#" + id).onclick = function() {
        events.post(events.CONTROLS, {
            parameter: id
        });
    };
}
