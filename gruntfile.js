module.exports = function(grunt){
    'use strict';

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js', 'app/js/*.js'],
            ignores: ['app/js/nunjucks.js'],
            options: {
                reporter: require('jshint-stylish')
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'app',
                    hostname: 'localhost', 
                    livereload: 35729,
                    open: {
                        target: 'http://localhost:9000'
                    }
                }       
            }
        },
        concat: {
            options: {
                separator: '/*file*/'
            },
            // js: {
            //     src: ['build/js/files/**/*.js'],
            //     // dest: 'build/js/<%= pkg.name %>.js'
            //     dest: '/home/adam/Server/js/robust.porter.js'
            // },
            css: {
                src: ['app/css/scss/build/*.css',],
                dest: 'app/css/<%= pkg.name %>.css'
            }
        },
        sass: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'app/css/scss/src',
                    src: ['*.scss'],
                    dest: 'app/css/scss/build',
                    ext: '.css'
                }]
            }
        },
        watch: {
            lintingtasks: {
                files: ['app/**/*.js'],
                tasks: ['jshint']
            },
            reloadfiles: {
                files: ['app/**/*'],
                options: {
                    livereload: true
                }
            },
            sass: {
                //~ options: {
                    //~ livereload: false
                //~ },
                files: ['app/css/**/*.scss'],
                tasks: ['buildcss']
            },
        }

    });
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'connect', 'watch']);
    grunt.registerTask('buildcss',  ['sass', 'concat:css']);
};