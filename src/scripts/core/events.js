var listeners = {};

module.exports = {
    CONTROLS: 'controls',
    NAVIGATOR_STATE_CHANGED: 'navigator-state-changed'
};

module.exports.post = post;
module.exports.listen = listen;

function listen(name, listener) {
    if (!listeners[name]) {
        listeners[name] = [];
    }
    listeners[name].push(listener);
}

function post(name, event) {
    if (listeners[name]) {
        listeners[name].forEach(invoke);
    }
    function invoke(listener) {
        try {
            listener(event);
        } catch (e) {
            console.error(e);
        }
    }
}

