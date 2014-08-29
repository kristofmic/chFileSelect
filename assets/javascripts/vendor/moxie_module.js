(function(angular) {
  /**
  * mOxie provides a polyfill for doing file uploads that is cross-browser compatible
  * https://github.com/moxiecode/moxie/wiki/API
  */

  var
    dependencies = [],
    moxieDefinition,
    fileInputDefinition,
    fileDropDefinition,
    fileReaderDefinition;

  moxieDefinition = [
    '$window',
    moxie
  ];

  fileInputDefinition = [
    'moxie',
    fileInput
  ];

  fileDropDefinition = [
    'moxie',
    fileDrop
  ];

  fileReaderDefinition = [
    'moxie',
    fileReader
  ];

  angular.module('ch.Vendor.Moxie', dependencies)
    .factory('moxie', moxieDefinition)
    .factory('FileInput', fileInputDefinition)
    .factory('FileDrop', fileDropDefinition)
    .factory('FileReader', fileReaderDefinition);

  function moxie($window) {
    $window.mOxie.Env.swf_url = './Moxie.swf';
    $window.mOxie.Env.xap_url = './Moxie.xap';

    return $window.mOxie;
  }

  function fileInput(moxie) { return moxie.FileInput; }
  function fileDrop(moxie) { return moxie.FileDrop; }
  function fileReader(moxie) { return moxie.FileReader; }

})(angular);