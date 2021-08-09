const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const minifyCss = require('gulp-minify-css');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');



gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./static/sass/**/*.scss')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('./static.css'));

    return gulp.src('./static/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/static'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/static'));

});


gulp.task('js', function(done){
    console.log('minifying js...');
    return gulp.src('./static/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/static'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/static'));
    
});


gulp.task('images', function(done){
    console.log('compressing images...');
    return gulp.src('./static/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/static'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/static'));
    
});


// empty the public/static directory
gulp.task('clean:static', function(done){
    del.sync('./public/static');
    done();
});

gulp.task('build', gulp.series('clean:static', 'css', 'images','js'), function(done){
    console.log('Building static');
    return;

});