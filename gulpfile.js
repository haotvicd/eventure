const gulp = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const less = require('gulp-less');
const importLess = require('gulp-import-less');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const browserSync = require('browser-sync').create();


function copyAsset() {
  return gulp.src(['src/assets/**/*']).pipe(gulp.dest('./dist/assets'));
}

function cleanSource() {
  return del(['dist/**', '!dist']);
}

//compile scss into css
function style() {
  return gulp.src(['src/less/**/*.less', '!src/less/includes/**/*.less'])
    .pipe(sourcemaps.init())
    .pipe(importLess())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
}

//compile jade into html
function html() {
  return gulp.src(['src/pug/**/*.pug', '!src/pug/_layout/*.pug', '!src/pug/_modules/*.pug', '!src/pug/_mixins/*.pug', '!src/pug/_components/*.pug'])
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}


function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    port: 4000
  });
  gulp.watch('src/assets/**/*', copyAsset).on('change', browserSync.reload);
  gulp.watch('src/less/**/*.less', style).on('change', browserSync.reload);
  gulp.watch('src/pug/**/*.pug', html).on('change', browserSync.reload);
}



// define complex tasks
const build = gulp.series(cleanSource, style, html, copyAsset);
const dev = gulp.series(build, watch);

// export tasks
exports.cleanSource = cleanSource;
exports.style = style;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = dev;