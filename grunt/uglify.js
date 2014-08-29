module.exports = {
  dist: {
    options: {
      compress: {
        drop_console: true
      }
    },
    files: {
      '<%= distPath %>/components.min.js': ['<%= distPath %>/components.js'],
      '<%= distPath %>/chFileSelect.min.js': ['<%= distPath %>/chFileSelect.js']
    }
  }
};