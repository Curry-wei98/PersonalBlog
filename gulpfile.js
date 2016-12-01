const gulp=require('gulp'),
      babel=require('gulp-babel');

gulp.task('default',function(){
        return gulp.src('src/Plugin/js/blog.js')
            .pipe(babel({
                presets:['es2015']
            }))
            .pipe(gulp.dest('dist/Plugin/js/'))
});