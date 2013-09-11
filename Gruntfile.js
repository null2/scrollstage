module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      dev: {
        src: ['scenes/animation.scss', 'scenes/*/animation.scss'],
        dest: 'tmp/animation.scss'
      }
    },
    sass: {
      dev: {
        files: {
          'css/animation.css': 'tmp/animation.scss'
        }
      }
    },
    clean: {
      files: 'tmp'
    },
    watch: {
      stylesheets: {
        files: '**/*.scss',
        tasks: ['build']
      }
    },
    devserver: {
      options: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-devserver');

  grunt.registerTask('build', ['concat', 'sass', 'clean']);

  grunt.registerTask('default', ['build', 'devserver']);
};
