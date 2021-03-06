'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    dirs: {
      src: 'src',
      publish: 'publish',
      tmp: '.tmp' // Don't change this. It's expected.
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.tmp %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= dirs.tmp %>/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 0,
        livereload: true,
        open: true
       },
      livereload: {
        options: {
          base: [
            '<%= dirs.tmp %>',
            '<%= dirs.src %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '<%= dirs.tmp %>',
            'test',
            '<%= dirs.src %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= dirs.publish %>'
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
            '*{ico,png,txt}',
            'images/{,*/}*.{webp,gif}'
          ],
          dest: '<%= dirs.publish %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= dirs.src %>/styles',
        dest: '<%= dirs.tmp %>/styles/',
        src: '{,*/}*.css'
      }
    },
    compass: {
      options: {
        sassDir: '<%= dirs.src %>/styles',
        cssDir: '<%= dirs.tmp %>/styles',
        generatedImagesDir: '<%= dirs.tmp %>/images/generated',
        imagesDir: '<%= dirs.src %>/images',
        javascriptsDir: '<%= dirs.src %>/scripts',
        fontsDir: '<%= dirs.src %>/styles/fonts',
        importPath: '<%= dirs.src %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        boring: true
      },
      dist: {
        options: {
          generatedImagesDir: '<%= dirs.publish %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= dirs.publish %>'
      },
      html: '<%= dirs.src %>/{,*/}*.html'
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.src %>',
          src: '{,*/}*.html',
          dest: '<%= dirs.publish %>'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.src %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= dirs.publish %>/images'
        }]
      }
    },
    usemin: {
      options: {
        dirs: ['<%= dirs.publish %>']
      },
      html: ['<%= dirs.publish %>/{,*/}*.html'],
      css: ['<%= dirs.publish %>/styles/{,*/}*.css']
    },
    watch: {
      compass: {
        files: ['<%= dirs.src %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= dirs.src %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= dirs.src %>/{,*}/*.html',
          '<%= dirs.tmp %>/styles/{,*/}*.css',
          '{<%= dirs.tmp %>,<%= dirs.src %>}/scripts/{,*/}*.js',
          '<%= dirs.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= dirs.tmp %>',
            '<%= dirs.publish %>/*',
            '!<%= dirs.publish %>/.git*'
          ]
        }]
      },
      server: '<%= dirs.tmp %>'
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= dirs.publish %>/scripts/{,*/}*.js',
            '<%= dirs.publish %>/styles/{,*/}*.css',
            '<%= dirs.publish %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= dirs.publish %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    concurrent: {
      server: [
        'compass',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'compass',
        'copy:styles',
        'imagemin',
        // 'svgmin',
        'htmlmin'
      ]
    }
  });

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    // 'requirejs',
    'concat',
    'cssmin',
    // 'uglify',
    // 'modernizr',
    'copy:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });
};
