var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var cp = require('child_process');
var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var browserSync = require('browser-sync').create();


function jekyllBuild() {
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
}

function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: "_site"
    }
  })
  done();
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function watch() {
  gulp.watch(
    [
    '*.html',
    '*.md',
    '*.markdown',
    '_layouts/*.html',
    '_pages/*',
    '_posts/*',
    '_data/*.yml',
    '_data/*.json',
    '_includes/*',
    '_includes/*/*',
    '_includes/*/*/*',
    'js/*.js',
    'css/*.css',
    '_config.yml'
  ],
  gulp.series(jekyllBuild, browserSyncReload));
}

gulp.task('default', gulp.parallel(jekyllBuild, browserSyncServe, watch))
gulp.task('build', gulp.parallel(jekyllBuild))