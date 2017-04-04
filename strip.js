'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const pluginName = 'gulp-remove-regex';

module.exports = function (params) {

    return through.obj(handle);

    function handle(file, enc, callbackFunc){
        if (file.isNull()) {
            callbackFunc(null, file);
            return;
        }

        if (file.isStream()) {
            callbackFunc(error('streaming not supported'));
            return;
        }

        try {
            var data = file.contents.toString();
            for (var entry in params) {
                if (params.hasOwnProperty(entry)) {
                    var arr = data.split(params[entry]);
                    console.log(entry + ": " + (arr.length - 1));
                    data = arr.join('');
                }
            }
            file.contents = new Buffer(data);
            this.push(file);
        } catch (e) {
            this.emit('error', error(e));
        }

        callbackFunc();
    }
};

function error(e) {
    return new gutil.PluginError(pluginName, e);
}
