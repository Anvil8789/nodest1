var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

function reload() {
  browserSync.reload({ stream: false });
};

gulp.task('browsersync', function() {
  browserSync.init({
    files: ['public/**/*.*', 'views/**/*.*'], // BrowserSync�ɂ܂�����t�@�C���Q
    proxy: 'http://localhost:3000',  // express �̓��삷��|�[�g�Ƀv���L�V
    port: 4000,  // BrowserSync �� 4000 �ԃ|�[�g�ŋN��
    open: false  // �u���E�U open ���Ȃ�
  });
});

gulp.task('serve', ['browsersync'], function () {
  nodemon({ 
    script: './bin/www',
    ext: 'js html css',
    ignore: [  // nodemon �ŊĎ����Ȃ��f�B���N�g��
      'node_modules',
      'bin',
      'views',
      'public',
      'test'
    ],
    env: {
      'NODE_ENV': 'development'
    },
    stdout: false  // Express �̍ċN�����̃��O���Ď����邽��
  }).on('readable', function() {
  this.stdout.on('data', function(chunk) {
  if (/^Express\ server\ listening/.test(chunk)) {
        // Express �̍ċN��������������Areload() ��BrowserSync �ɒʒm�B
        // ��Express �ŏo�͂���N�����̃��b�Z�[�W�ɍ��킹�Ĕ�r������͏C��
        reload();
      }
      process.stdout.write(chunk);
    });
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  });
});

gulp.task('default', ['serve']);
