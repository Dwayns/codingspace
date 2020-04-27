var gulp = require ('gulp');
// var gulp = require ('jquery');
var minifyHtml = require ('gulp-minify-html');
var sass = require ('gulp-sass');
var cssnano = require ('gulp-cssnano');
var autoprefixer = require ('gulp-autoprefixer');
var bs = require('browser-sync').create();

// var inject = require('gulp-inject');

var paths = {
    font: {
        src: '../../librairies/fonts/Neo Sans/NeoSans.otf',
        dest: 'dist/fonts'
    },
    html: {
        src: 'dom/*.html',
        dest: 'dist/dom'
    },
    img: {
        src: '../../librairies/graphics/**/*',
        dest: 'dist/img'
    },
    index: {
        src: 'index.html',
        dest: 'dist'
    },
    js: {
        src: 'src/js/*.js',
        dest: 'dist/js'
    },
    json: {
        src: 'src/json/*.json',
        dest: 'dist/json'
    },
    styles: {
        src: 'src/scss/*.scss',
        dest: 'dist/css'
    }
};

/* var bootstrapSass = {
    src: './node_modules/bootstrap-sass/',
    styles: './node_modules/bootstrap-sass/stylesheets/'
} */

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
    // .pipe(cssnano())
    // .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.reload({stream: true}));
});

gulp.task('js', function() {
    return gulp.src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
});

gulp.task('json', ['js'], function() {
    return gulp.src(paths.json.src)
        .pipe(gulp.dest(paths.json.dest))
});

gulp.task('img', ['styles', 'js'], function() {
    return gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dest))
});

gulp.task('font', ['styles', 'js', 'img'], function() {
    return gulp.src(paths.font.src)
        .pipe(gulp.dest(paths.font.dest))
});

gulp.task('index', ['styles', 'js', 'img', 'font'], function() {
    return gulp.src(paths.index.src)
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.index.dest))
});

gulp.task('html', ['styles', 'js', 'img', 'font', 'index'], function() {
    return gulp.src(paths.html.src)
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.html.dest))
});

gulp.task('watch', ['bserve'], function() {
    gulp.watch(paths.styles.src, ['styles']);
    gulp.watch(paths.js.src, ['js']).on('change', bs.reload);
    gulp.watch(paths.js.src, ['json']).on('change', bs.reload);
    gulp.watch(paths.img.src, ['img']).on('change', bs.reload);
    gulp.watch(paths.index.src, ['index']).on('change', bs.reload);
    gulp.watch(paths.html.src, ['html']).on('change', bs.reload);
})

gulp.task('default', ['index', 'html', 'js', 'json', 'watch']);
