module.exports = {
  dev: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/file_select_module.js',
      '<%= jsPath %>/**/*.js'
    ],
    dest: '<%= distPath %>/chFileSelect.js'
  }
};
