var gulp = require ('gulp');
var minifyHtml = require ('gulp-minify-html');
var sass = require ('gulp-sass');
var cssnano = require ('gulp-cssnano');
var autoprefixer = require ('gulp-autoprefixer');
var bs = require('browser-sync').create();

// var inject = require('gulp-inject');

var paths = {
    js: {
        src: 'js/*.js',
        dest: 'dist/js'
    },
    styles: {
        src: 'scss/*.scss',
        dest: 'dist/css'
    },
    html: {
        src: 'templates/index.html',
        dest: 'dist'
    }
};

var bootstrapSass = {
    src: './node_modules/bootstrap-sass/',
    styles: './node_modules/bootstrap-sass/stylesheets/'
}

gulp.task('bserve', function() {
    bs.init({
        server: {
            baseDir: './dist'
        }
    })
})

gulp.task('styles', function(){
    // return gulp.src('src/assets/scss/*.scss')
    return gulp.src(paths.styles.src)
    .pipe(sass(/*{
        includePaths: __dirname/bootstrapSass.styles
    }*/).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 version'],
        cascade: false
    }))
    .pipe(cssnano())
    // .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.reload({stream: true}));
});

gulp.task('js', function() {
    return gulp.src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
});

gulp.task('html', ['styles', 'js'], function() {
    return gulp.src(paths.html.src)
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.html.dest))
});

gulp.task('watch', ['bserve'], function() {
    gulp.watch(paths.styles.src, ['styles']);
    gulp.watch(paths.js.src, ['js']).on('change', bs.reload);
    gulp.watch(paths.html.src, ['html']).on('change', bs.reload);
})

gulp.task('default', ['html', 'js', 'watch']);
