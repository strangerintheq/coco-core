var events = require('../core/events');

document.querySelector("#switch-globe").onclick = function() {
    events.post(events.SWITCH_GLOBE);
};

document.querySelector("#settings").onclick = function() {
    events.post(events.TOGGLE_FORM, "form-settings");
};