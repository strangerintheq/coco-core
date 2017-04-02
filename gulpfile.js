var GulpTask = require('gulp-task-builder');

var dest = './bin';
var plugins = new GulpTask('plugins').plugins;

new GulpTask('scripts')
    .webpack({
        entry: "./src/scripts/app.js",
        output: {
            filename: "app.js"
        },
        plugins: [
            // new plugins.webpack.webpack.optimize.UglifyJsPlugin({ minimize: true })
        ]
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
