'use strict';
module.exports = function (grunt) {
	//time how long task take. Can help whne optimizing build times
    require('time-grunt')(grunt);
    
    //autmatically load required gGrunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    
    //Define the configuration for all task
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Make sure code styles are up to par and there are no obious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
    },
                     all: {
                        src: [
                            'Grunfile.js',
                            'app/scripts/{,*/}*.js'
                     ]
                     }
                },
        useminPrepare: {
            html: 'app/menu-4.html',
            options: {
                dest: 'dist'
            }
        },
        //concat
        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        //uglyfy
        uglify: {
            // dist configuration is provide by useminPrepare
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        // Filrev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                // filerev: release hashes(md5) all assets (images, js and css)
                // in dist directory
                files: [{
                    src: [
                        'dist/scripts/*.js',
                        'dist/styles/*.css',
                    ]
                }]
            }
        },
        // usemin
        // Replaces all assets with their revised version in htm and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/*.html'],
            css: ['dist/styles/*.css'],
            options: {
                assetsDirs: ['dist', 'dist/styles']
            }
        },
        copy: {
            dist: {
                cwd: 'app',
                src: ['**','!styles/**/*.css','!scripts/**/*.js'],
                dest: 'dist',
                expand: true
            },
            fonts: {
                files: [
                    {
                        //for bootstrap fonts
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }, {
                        //for font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }
                    
                ]
            }
        },
        watch: {
            copy: {
                files: ['app/**', '!app/**/*.css','!app/**/*.js'],
                task: ['build']
            },
            scripts: {
                files: ['app/scripts/app.js'],
                tasks:[ 'build']
            },
            styles: {
                files: ['app/styles/mystyles.css'],
                tasks:['build']
            },
             livereload: {
                 options: {
                    livereload: '<%= connect.options.livereload %>'
                    },
    
                files: [
                    'app/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
            port: 9000,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: 'localhost',
            livereload: 35729
            },
              dist: {
                  options: {
                      open: true,
                      base:{
                          path: 'dist',
                          options: {
                              index: 'menu-4.html',
                              maxAge: 300000
                          }
                      }
                  }
              }
        },
        clean: {
            build: {
                src: ['dist/']
            }             
        }
	
	});
    
    grunt.registerTask('build', [
        'clean',
        'jshint',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'filerev',
        'usemin'
    ]);
    
    
    grunt.registerTask('default', ['build']);
    
    grunt.registerTask('serve', ['build', 'connect:dist', 'watch']);
    
};
