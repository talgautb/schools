'use strict';
// Builder
import gulp from 'gulp';
import watch from 'gulp-watch';
import sysBuilder from 'systemjs-builder';

// // Scripts
import tsc from 'gulp-typescript'
import tslint from 'gulp-tslint'

// // Tools
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import useref from 'gulp-useref';

/**
 * Constants
 */

const path = {
  stylus: './app/**/*.styl',
  ts: './app/**/*.ts',
  script: './app/**/*.js'
};

/**
 * Lint typescript
 */
gulp.task('tslint', () => {
  return gulp.src(path.ts)
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
});

/**
 * Compile typescript to ES5
 */
gulp.task('tsc-compile', ['tslint'], () => {

  const tsProject = tsc.createProject('./tsconfig.json');

  let tsResult = gulp.src(path.ts)
      .pipe(tsProject());

  return tsResult.js
    .pipe(gulp.dest('app/'));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task('resources', () => {
  return gulp.src([
    '**/*.json',
    '**/*.svg',
    '**/*.html',
    '**/*.css',
    '*.png',
    '!node_modules/**/*',
    '!dist/**/*',
    '!index.html',
    '!*.json'
    ])
    .pipe(gulp.dest('dist'));
});

// Copy json with translations
gulp.task('i18n', () => {
  return gulp.src('i18n/*.json')
    .pipe(gulp.dest('dist/i18n'));
});

/**
 * Copy styles
 * add autoprefixer stylelint
 */
gulp.task('styles', () => {
  return gulp.src('*.css')
    .pipe(gulp.dest('dist'));
});

// Create bundle with libs from html
gulp.task('bundle:lib', () => {
  return gulp.src('index.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle:js', function() {
  const conf = {
    minify: false,
    sourceMaps: false
  };

  let builder = new sysBuilder('./', 'systemjs.config.js');

  return builder.buildStatic('app/main.js', 'dist/main.js', conf)
    .catch(function(err) {
      console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
    });
});

gulp.task('build', ['tsc-compile', 'resources', 'bundle:lib', 'bundle:js']);

gulp.task('copy', ['resources', 'i18n', 'styles']);
