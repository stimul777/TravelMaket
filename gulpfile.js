const gulp = require('gulp');
const gulp_less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const gulp_autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const watcher = require('gulp-watch');		
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');

var gulp_sass = require('gulp-sass');
sass.compiler = require('node-sass');

function html() {
	return gulp.src('./static/index.html')
	.pipe(gulp.dest('./build/'))
	.pipe(browserSync.stream());
};

function js() {
	return gulp.src('./static/project/*.js')
		.pipe(gulp.dest('./build/project/'))
		.pipe(browserSync.stream());
};

function css() {
	return gulp.src('./static/project/*.css')
		.pipe(gulp.dest('./build/project/'))
		.pipe(browserSync.stream());
};

function less() {
	return gulp.src('./static/project/*.less')
					.pipe(sourcemaps.init())
					.pipe(gulp_less('main.css'))
					.pipe(gulp_autoprefixer({
			            overrideBrowserslist: ['> 0.1%'],
			            cascade: false
		        	}))
		        	.pipe(gcmq())
		        	.pipe(cleanCSS({level:2}))
		        	.pipe(sourcemaps.write())
					.pipe(gulp.dest('./build/project'))
					.pipe(browserSync.stream());
};

function sass() {
	return gulp.src('./static/project/*.sass')
					.pipe(sourcemaps.init())
					.pipe(gulp_sass('main.css'))
					.pipe(gulp_autoprefixer({
			            overrideBrowserslist: ['> 0.1%'],
			            cascade: false
		        	}))
		        	.pipe(gcmq())
		        	.pipe(cleanCSS({level:2}))
		        	.pipe(sourcemaps.write())
					.pipe(gulp.dest('./build/project'))
					.pipe(browserSync.stream());
	
  };

function watch () {
	browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

	gulp.watch('./static/project/*.less',less).on('change', browserSync.reload);
	gulp.watch('./static/project/*.scss',sass).on('change', browserSync.reload);
	gulp.watch('./static/styles/bem/components/*.less',sass).on('change', browserSync.reload);
    gulp.watch('./static/styles/bem/components/*.less',less).on('change', browserSync.reload);

	// Стандарт
	gulp.watch('./static/project/*.js',js).on('change', browserSync.reload);
	gulp.watch('./static/project/*.css',css).on('change', browserSync.reload);
	gulp.watch('./static/index.html',html).on('change', browserSync.reload);
};

gulp.task('css',css);
gulp.task('html',html);
gulp.task('less',less);
gulp.task('sass',sass);
gulp.task('js',js);
gulp.task('watch',watch);