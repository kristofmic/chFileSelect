module.exports = {
  moxieFL: {
    expand: true,
    src: [
      '<%= componentsPath %>/moxie/bin/flash/*'
    ],
    dest: '<%= distPath %>/flash',
    flatten: true
  },
  moxieSL: {
    expand: true,
    src: [
      '<%= componentsPath %>/moxie/bin/silverlight/*'
    ],
    dest: '<%= distPath %>/silverlight',
    flatten: true
  },
  moxieJS: {
    expand: true,
    src: [
      '<%= componentsPath %>/moxie/bin/js/moxie.js',
      '<%= componentsPath %>/moxie/bin/js/moxie.min.js',
      '<%= jsPath %>/vendor/moxie_module.js',
    ],
    dest: '<%= distPath %>',
    flatten: true
  }
};