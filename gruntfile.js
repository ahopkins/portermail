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
                    },
                    middleware: function (connect, options, middlewares) {
                        
                        middlewares.push(function(req, res, next) {
                            if(req.url!='' && req.url!='/') {
                                var http = require('http');


                                var options = {
                                    host: 'localhost',
                                    port: '9000',
                                    path: '/'
                                }
                                var request = http.request(options, function (result) {
                                    // console.log(result);
                                    var data = '';
                                    result.on('data', function (chunk) {
                                        data += chunk;
                                        // // res.write(data);
                                        // console.log(data);
                                    });
                                    result.on('end', function () {
                                        // console.log(data);
                                        res.write(data);
                                        res.end();
                                        return next();
                                    });
                                });
                                request.on('error', function (e) {
                                    console.log(e.message);
                                });
                                request.end();
                                // res.writeHead(302,
                                //   {Location: 'http://localhost:9000/:lll'}
                                // );
                                // res.params = '?p=q'
                            }
                        });

                        return middlewares;
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