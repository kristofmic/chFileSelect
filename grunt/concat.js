module.exports = {
  dev: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= componentsPath %>/moxie/bin/js/moxie.js',
      '<%= jsPath %>/vendor/moxie_module.js',
      '<%= jsPath %>/file_select_module.js',
      '<%= jsPath %>/**/*.js'
    ],
    dest: '<%= distPath %>/chFileSelect.js'
  }
};
