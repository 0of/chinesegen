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
        webpack: require('./webpack.chinesegen')
    });

    grunt.registerTask('eslint', 'eslint:target');
    grunt.registerTask('build', ['eslint:target', 'clean', 'webpack']);

    require('load-grunt-tasks')(grunt);
};