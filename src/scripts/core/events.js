var listeners = {};

module.exports = {
    CONTROLS_CHANGED: 'controls',
    NAVIGATOR_STATE_CHANGED: 'navigator-state-changed',
    SWITCH_GLOBE: 'switch-globe'
};

module.exports.post = function (name, event) {
    if (listeners[name]) {
        listeners[name].forEach(function (listener) {
            try {
                listener(event);
            } catch (e) {
                console.error(e);
            }
        });
    }
};

module.exports.listen = function (name, listener) {
    if (!listeners[name]) {
        listeners[name] = [];
    }
    listeners[name].push(listener);
};

