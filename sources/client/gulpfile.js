var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpJest = require('./gulp-jest');
var sync = $.sync(gulp).sync;
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');
var url = require('url');

var bundler = {
  w: null,
  init: function () {
    this.w = watchify(browserify({
      entries: ['./app/scripts/app.js'],
      insertGlobals: true,
      cache: {},
      packageCache: {},
      debug: true
    }));
  },
  bundle: function () {
    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('app.js', './app'))
      .pipe(buffer())
      .pipe(gulp.dest('./../../temp/client/scripts'));
  },
  watch: function () {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function () {
    this.w && this.w.close();
  }
};

gulp.task('test', ['lint', 'jest']);
gulp.task('default', ['watch']);

gulp.task('serve', function () {
  var folder = path.resolve(__dirname, "./../../temp/client");
  gulp.src('../../temp/client')
    .pipe($.webserver({
      livereload: true,
      port: 9000,
      middleware: function (req, res, next) {
        var fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");
        var fileExtension = path.extname(fileName);
        var hasExtension = !!fileExtension;
        if (!hasExtension) {
          req.url = '/';
        }

        return next();
      }
    }));
});

gulp.task('jest', function () {
  var nodeModules = path.resolve('./node_modules');
  var options = {
    testDirectoryName: 'scripts',
    testFileExtensions: ['spec.js'],
    scriptPreprocessor: nodeModules + '/babel-jest',
    unmockedModulePathPatterns: [
      'react',
      'classnames'
    ],
    verbose: true
  };

  return gulp.src('app').pipe(gulpJest(options));
});

gulp.task('lint', function () {
  return gulp.src('./app/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('scripts', ['lint'],  function () {
  bundler.init();
  return bundler.bundle();
});

gulp.task('styles', function () {
  var mainFile = './app/styles/main.less';

  var injectFiles = gulp.src([
    './app/**/*.less',
    '!' + mainFile
  ], {
    read: false
  });

  var injectOptions = {
    transform: function (filePath) {
      console.log('path: ', filePath);
      filePath = filePath.replace('app/', '../');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('main.less');

  return gulp.src(mainFile)
    .pipe($.plumber())
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.less())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('../../temp/client/styles'))
    .pipe($.size());
});

gulp.task('html', function () {
  var assets = $.useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('../../temp/client'))
    .pipe($.size());
});

gulp.task('clean', del.bind(null, '../../temp/client', {force: true}));

gulp.task('bundle', ['html', 'styles', 'scripts']);

gulp.task('clean-bundle', sync(['clean', 'bundle']));

gulp.task('watch', sync(['clean-bundle', 'serve']), function () {
  bundler.watch();
  gulp.watch('app/scripts/**/*.js', ['test']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/styles/**/*.less', ['styles']);
});
