module.exports = {
  dist: {
    options: {
      compress: {
        drop_console: false
      }
    },
    files: {
      '<%= distPath %>/chFileSelect.min.js': [
        '<%= distPath %>/chFileSelect.js'
      ]
    }
  }
};