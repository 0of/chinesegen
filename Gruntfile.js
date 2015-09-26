module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['dist/']
            }
        },
        eslint: {
            target: {
                src: ['lib/*.js', 'test/*.js']
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['./test/**/*.js']
            }
        },
        webpack: require('./webpack.chinesegen')
    });

    grunt.registerTask('eslint', 'eslint:target');
    grunt.registerTask('test', ['eslint:target', 'mochaTest:test']);
    grunt.registerTask('build', ['eslint:target', 'mochaTest:test', 'clean', 'webpack']);

    require('load-grunt-tasks')(grunt);
};