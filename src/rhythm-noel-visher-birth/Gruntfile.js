'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    dirs: {
      src: 'src',
      dist: 'dist'
    },
    connect: {
      server: {
        options: {
          port: 0,
          open: true,
          base: 'src'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.src %>',
          src: [
            '**'
          ],
          dest: '<%= dirs.dist %>'
        }]
      }
    }
  });

  grunt.registerTask('default', ['copy:dist']);
};
