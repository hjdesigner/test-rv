var gulp          = require('gulp'),
    imagemmin     = require('gulp-imagemin'),
    clean         = require('gulp-clean'),
    concat        = require('gulp-concat'),
    htmlReplace   = require('gulp-html-replace'),
    uglify        = require('gulp-uglify'),
    cssmin        = require('gulp-cssmin'),
    browserSync   = require('browser-sync'),
    csslint       = require('gulp-csslint'),
    autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),
    sass          = require('gulp-sass'),
    spritesmith   = require('gulp.spritesmith'),
    gutil         = require('gulp-util'),
    babel         = require('gulp-babel');

var paths = {
 styles: ['css/**/*.css'],
 html: ['index.html'],
 images: ['images/**/*'], 
 js: ['js/**/*.js']
};

gulp.task('prod', ['copy'], function(){
});

gulp.task('copy', ['clean'], function(){
 gulp.src(paths.html, {cwd: 'src/'})
     .pipe(gulp.dest('build/'));
 gulp.src(paths.styles, {cwd: 'src/'})
     .pipe(gulp.dest('build/' + 'css')); 
 gulp.src(paths.js, {cwd: 'src/'})
     .pipe(gulp.dest('build/' + 'js')); 
 gulp.src(paths.images, {cwd: 'src/'})
     .pipe(gulp.dest('build/' + 'images'));
});

gulp.task('clean', function(){
  return gulp.src('build')
      .pipe(clean());
});

gulp.task('build-img',function(){
  gulp.src('src/images/**/*')
    .pipe(imagemmin())
    .pipe(gulp.dest('build/images'));
});

gulp.task('sass', function(){
    return gulp.src('src/sass/rv.+(scss|sass)')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error',sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write(''))            
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/images/icons/*')
        .pipe(spritesmith({
            imgName: '../images/sprite.png',
            cssName: 'sprite.scss'
        }));
    spriteData.img.pipe(gulp.dest('src/images/'));
    spriteData.css.pipe(gulp.dest('src/sass/base/'));
    spriteData.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('minify-js', function () {
  gulp.src('src/scripts/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['es2015']
  }))
  .pipe(concat('rv.js'))
  .pipe(uglify())
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('src/js/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('server', function(){
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
  
  gulp.watch('src/**/*').on('change', browserSync.reload);

  gulp.watch('src/scripts/**/*.js', ['minify-js']);

  gulp.watch('src/sass/**/*.+(scss|sass)', ['sass']);

  gulp.watch(['src/images/icons/**/*'], ['sprite']);

});