var TaskBuilder = require('gulp-task-builder');
var regexStrip = require('./strip');
var removeEmptyLines = require('gulp-remove-empty-lines');

TaskBuilder.task('scripts')
    .webpack('scripts/app.js', false)
    //.subTask(regexStrip({
    //    ifThrow: /(^|\s+|[^a-zA-Z])if\s*\([^)]+\)\s*{\s*throw\s+new\s+[^}]+}/,
    //    comment: /\/\*[\s\S]*?\*\/|([^"\\:]|^)\/\/.*$/gm,
    //    fixElse: /else\s*else/
    //}))
    .temp();

TaskBuilder.task('styles')
    .src('styles/**')
    .stylus()
    .concatCss('app.css')
    .temp();

TaskBuilder.task('resources')
    .src('resources/**')
    .dest();

TaskBuilder
    .task('default')
    .depends([
        'scripts',
        'styles',
        'resources'
    ])
    .src('html/index.html')
    .fileinclude()
    //.subTask(removeEmptyLines())
    .dest();


