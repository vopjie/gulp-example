var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync'),
    pngquant = require('imagemin-pngquant'),
    imageminJpegtran = require('imagemin-jpegtran'),
    imageminGifsicle = require('imagemin-gifsicle');
    var postcss = require('gulp-postcss');
    var px2rem = require('postcss-px2rem');
    var autoprefixer = require('autoprefixer');
    var mqpacker = require('css-mqpacker');
    var csswring = require('csswring');

// browser-sync
gulp.task('browser-sync', function() {
  var files = [
    'app/*.html',
    'app/css/*.css',
    'app/js/*.js'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './app/'
    }
    // proxy: "http://www.shenmatouzi.com"
    // open: false
  });
});

// HTML处理队列
gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(plugins.htmlhint())
    .pipe(plugins.htmlhint.failReporter());
});

// JS处理队列
gulp.task('js', function() {
  return gulp.src('app/js/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(function(path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('app/js/min/'));
});

var opacity = function (css, opts) {
    css.walkDecls(function(decl) {
        if (decl.prop === 'opacity') {
            decl.parent.insertAfter(decl, {
                prop: '-ms-filter',
                value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
            });
        }
    });
};
// compass处理队列
gulp.task('compass', function() {
    var processors = [
        px2rem({remUnit: 75}),
        autoprefixer({browsers: ['last 2 version']}),
        opacity,
        mqpacker,
        csswring
    ];
  gulp.src('app/sass/*.scss')
    .pipe(plugins.compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'app/sass'
    }))
    .pipe(postcss(processors))
    // .pipe(plugins.minifyCss())
    // .pipe(plugins.rename(function(path) {
    //     path.basename += ".min";
    // }))
  .pipe(gulp.dest('app/css/'));
});

// CSS处理队列
// gulp.task('css', function() {
//   return gulp.src('css/*.css')
//     .pipe(plugins.autoprefixer({
//       browsers: ['last 2 version']
//     }))
//     .pipe(plugins.csslint())
//     .pipe(plugins.csslint.reporter())
//     .pipe(plugins.minifyCss())
//     .pipe(plugins.rename(function(path) {
//       path.basename += ".min";
//     }))
//     .pipe(gulp.dest('css/'));
// });

// 图片压缩处理队列
gulp.task('imgmin', ['png', 'jpeg', 'gif']);

gulp.task('png', function() {
  return gulp.src('images/*.png')
    .pipe(plugins.imagemin({
      use: [pngquant()]
    }))
    .pipe(gulp.dest('images/'));
});
gulp.task('jpeg', function() {
  return gulp.src('images/*.jpg')
    .pipe(plugins.imagemin({
      use: [imageminJpegtran()]
    }))
    .pipe(gulp.dest('images/'));
});
gulp.task('gif', function() {
  return gulp.src('images/*.gif')
    .pipe(plugins.imagemin({
      use: [imageminGifsicle()]
    }))
    .pipe(gulp.dest('images/'));
});

// 默认任务
gulp.task('default', ['watch', 'browser-sync', 'html', 'js', 'compass']);

gulp.task('watch', function() {
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('app/sass/*.scss', ['compass']);
});
