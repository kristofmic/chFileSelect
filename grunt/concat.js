module.exports = {
  components: {
    src: [
      '<%= componentsPath %>/angular/angular.js',
      '<%= componentsPath %>/moxie/bin/js/moxie.js',
    ],
    dest: '<%= distPath %>/components.js'
  },
  dev: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/vendor/**/*.js',
      '<%= jsPath %>/file_upload_module.js',
      '<%= jsPath %>/**/*.js',
    ],
    dest: '<%= distPath %>/chFileSelect.js'
  }
};
