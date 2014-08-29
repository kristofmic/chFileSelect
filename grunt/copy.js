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
  }
};