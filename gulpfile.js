var TaskBuilder = require('gulp-task-builder');
var regexStrip = require('./strip');

TaskBuilder.task('scripts')
    .webpack('scripts/app.js', true)
    .subTask(regexStrip({
       // ifThrow: /(^|\s+|[^a-zA-Z])if\s*\([^)]+\)\s*{\s*throw\s+new\s+[^}]+}/,
        //comment: /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm
    }))
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
    .fileInclude()
    .removeEmptyLines()
    .dest();


