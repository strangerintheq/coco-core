'use strict';
const gutil = require('gulp-util');
const through = require('through2');

module.exports = function (params) {

    return through.obj(function(file, enc, callbackFunc) {

        if (file.isNull()) {
            callbackFunc(null, file);
            return;
        }

        if (file.isStream()) {
            callbackFunc(new gutil.PluginError('gulp-example-plugin', 'Streaming not supported'));
            return;
        }

        var data = file.contents.toString();

        try {
            for (var entry in params) {
                if (params.hasOwnProperty(entry)) {
                    var arr = data.split(params[entry]);
                    console.log(entry + ": " + arr.length);
                    data = arr.join('');
                }
            }
            file.contents = new Buffer(data);
            this.push(file);
        } catch (error) {
            this.emit('error', new gutil.PluginError('gulp-example-plugin', error));
        }

        callbackFunc();
    });
};
