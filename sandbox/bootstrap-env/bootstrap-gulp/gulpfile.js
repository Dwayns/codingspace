var gulp = require ('gulp');
var minifyHtml = require ('gulp-minify-html');
var sass = require ('gulp-sass');
var cssnano = require ('gulp-cssnano');
var autoprefixer = require ('gulp-autoprefixer');
var bs = require('browser-sync').create();

// var inject = require('gulp-inject');

var paths = {
    styles: {
        src: 'src/assets/scss/*.scss',
        dest: 'dist/css'
    },
    html: {
        src: 'src/index.html',
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

gulp.task('html', ['styles'], function() {
    return gulp.src(paths.html.src)
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.html.dest))
});

gulp.task('watch', ['bserve'], function() {
    gulp.watch(paths.styles.src, ['styles']);
    gulp.watch(paths.html.src, ['html']).on('change', bs.reload);
})

gulp.task('default', ['html', 'watch']);





// gulp.task('html', ['styles'], function() {
//     var injectFiles = gulp.src('[dist/css/*.css]');

//     var injectOptions = {
//         addRootSlash: false,
//         ignorePath: ['src', 'dist']
//     };

//     return gulp.src('src/index.html')
//         .pipe(inject(injectFiles, injectOptions))
//         .pipe(gulp.dest('dist'))
// });
