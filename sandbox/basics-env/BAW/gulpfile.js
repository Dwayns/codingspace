const { src, dest, watch, series, parallel } = require('gulp'); // Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const autoprefixer = require('gulp-autoprefixer');
const bs = require('browser-sync').create(); // Browser Sync (for live render)
const sass = require('gulp-sass'); // Compile scss to css
const babel = require('gulp-babel'); // Write ES6 > compile to ES5
const cleancss = require('gulp-clean-css'); // Minify CSS
const sourcemap = require('gulp-sourcemaps'); // SourceMaps, add path impacted file
// const imagemin = require('gulp-imagemin'); // Images size more small
const concat = require('gulp-concat'); // Concat all file, in one
const uglify = require('gulp-uglify'); // Minify JS with UglifyJS3
// const notify = require('gulp-notify'); // Notification on your Mac/PC
// inject = require('gulp-inject');

// *** Files paths ***
const paths = {
  font: {
    src: '../../librairies/fonts/Neo Sans/NeoSans.otf',
    dest: 'dist/fonts',
  },
  html: {
    src: 'app/html/**/*.html',
    dest: 'dist/html',
  },
  img: {
    src: '../../librairies/graphics/**/*',
    dest: 'dist/img',
  },
  index: {
    src: 'index.html',
    dest: 'dist',
  },
  js: {
    main: 'src/js/main-baw.js',
    src: 'src/js/**/*.js',
    dest: 'dist/js',
  },
  json: {
    src: 'src/json/**/*.json',
    dest: 'dist/json',
  },
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css',
  },
};

const bserve = () =>
  bs.init({
    server: {
      baseDir: './dist',
    },
    // server: true
  });

// THIS FAILEdD... WHY ?
/* const reload = done =>
  bs.reload();
  done(); */

function reload(done) {
  bs.reload();
  done();
}

const styles = () =>
  src(paths.scss.src)
    .pipe(
      sourcemap.init({
        loadMap: true,
      }),
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(concat('styles.css'))
    .pipe(sourcemap.write('./'))
    .pipe(dest(paths.scss.dest));
// .pipe(bs.stream());

const scripts = () =>
  src(paths.js.src)
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(dest(paths.js.dest));

const json = () => src(paths.json.src).pipe(dest(paths.json.dest));

const images = () => src(paths.img.src).pipe(dest(paths.img.dest));

const font = () => src(paths.font.src).pipe(dest(paths.font.dest));

const index = () =>
  src(paths.index.src)
    // .pipe(inject(src(paths.scss.src), {relative: true, name:'styles'}))
    .pipe(dest(paths.index.dest));

const html = () => src(paths.html.src).pipe(dest(paths.html.dest));

// *** WATCHERS ***
const watchFiles = () => watch(paths.scss.src, series(styles, reload));
watch(paths.js.src, series(scripts, reload));
watch(paths.img.src, series(images, reload));
watch(paths.font.src, series(font, reload));
watch(paths.index.src, series(index, reload));
watch(paths.html.src, series(html, reload));
watch(paths.json.src, series(json, reload)); // ({message: "Watching files !!!"}))
/* src([paths.scss.dest, paths.js.src])
  .pipe(notify("Watching files !!!")); */

const watcher = parallel(watchFiles, bserve);

exports.watch = watcher;
exports.default = series(
  parallel(styles, scripts, images, font, index, html, json),
  bserve,
);

/*  exports.default = () => src(paths.scss.src)
    .pipe(sass().on('error', sass.logError)) */
