var GulpTask = require('gulp-task-builder');

var dest = './bin';

new GulpTask('scripts')
    .webpack({
        entry: "./src/scripts/app.js",
        output: {
            filename: "app.js"
        }
    })
    .temp();

new GulpTask('styles')
    .src('src/styles/**')
    .stylus()
    .concatCss('app.css')
    .temp();

new GulpTask('resources')
    .src('src/resources/**')
    .dest(dest);

new GulpTask('default')
    .depends([
        'scripts',
        'styles',
        'resources'
    ])
    .src('src/html/index.html')
    .fileinclude()
    .dest(dest);
