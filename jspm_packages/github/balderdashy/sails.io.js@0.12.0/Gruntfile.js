/* */ 
"format global";
/**
 * Grunt automation.
 */
module.exports = function(grunt) {

  grunt.initConfig({

    PATHS: {
      amdInstructions: './dependencies/amd_instructions.js',
      socketioClient: './dependencies/socket.io.min.js',
      sailsio: './sails.io.js',
      dist: './dist/sails.io.js'
    },

    concat: {
      options: {
        separator: ';\n\n',
      },
      dev: {
        src: ['<%= PATHS.amdInstructions %>', '<%= PATHS.socketioClient %>', '<%= PATHS.sailsio %>'],
        dest: '<%= PATHS.dist %>'
      }
    },

    watch: {
      files: ['<%= PATHS.sailsio %>'],
      tasks: ['concat']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['dev']);

  // Dev enviroment for copying over changes from src to example project.
  grunt.registerTask('dev', ['concat', 'watch']);


};
