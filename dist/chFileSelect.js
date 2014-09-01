
// assets/javascripts/file_select_module.js
(function(angular) {

  var dependencies;

  dependencies = [
    'ch.Vendor.Moxie'
  ];

  angular.module('ch.FileSelect', dependencies)
    .constant('FILE_EVENTS', {
      'SELECTED': 'fileSelect:selected',
      'DROPPED': 'fileSelect:dropped',
      'INVALID_TYPE': 'fileSelect:invalid:type',
      'INVALID_SIZE': 'fileSelect:invalid:size',
      'INVALID': 'fileSelect:invalid'
    })
    .constant('IMAGE_VALIDATIONS', {
      'SIZE': 2000000,
      'TYPES': 'jpg,jpeg,svg,png'
    });

})(angular);

// assets/javascripts/image_drop_directive.js
(function(angular) {

  var
    defintitions;

  defintitions = [
    'FileDrop',
    'imageHandler',
    'FILE_EVENTS',
    'IMAGE_VALIDATIONS',
    chImageDrop
  ];

  angular.module('ch.FileSelect')
    .directive('chImageDrop', defintitions);

  function chImageDrop(FileDrop, imageHandler, FILE_EVENTS, IMAGE_VALIDATIONS) {

    return {
      restrict: 'AC',
      replace: false,
      link: link
    };

    function link(scope, elem, attrs) {
      var
        drop,
        fileDropConfig;

      fileDropConfig = {
        drop_zone: elem[0],
        accept: [
          {
            title: 'Image files',
            extensions: IMAGE_VALIDATIONS.TYPES
          }
        ]
      };

      drop = new FileDrop(fileDropConfig);
      drop.bind('drop', imageHandler(FILE_EVENTS.DROPPED));
      drop.init();
    }

  }

})(angular);

// assets/javascripts/image_handler.js
(function(angular){

  var
    definitions;

  definitions = [
    '$rootScope',
    'FileReader',
    'FILE_EVENTS',
    'IMAGE_VALIDATIONS',
    imageHandler
  ];

  angular.module('ch.FileSelect')
    .factory('imageHandler', definitions);

  function imageHandler($rootScope, FileReader, FILE_EVENTS, IMAGE_VALIDATIONS) {
    return handleChange;

    function handleChange(broadcastEventName) {
      return handler;

      function handler(e) {
        var
          file,
          files = e.target.files,
          validSize,
          validImage,
          reader;

        if (files.length) {
          file = files[0];
          validSize = isValidFileSize(file);
          validImage = isValidFileImage(file);

          if (validSize && validImage) {
            reader = new FileReader();
            reader.bind('loadend', handleLoadEnd);
            reader.readAsDataURL(file);
          }
          else {
            if (!validSize && !validImage) {
              $rootScope.$broadcast(FILE_EVENTS.INVALID);
            }
            else if (!validSize) {
              $rootScope.$broadcast(FILE_EVENTS.INVALID_SIZE);
            }
            else if (!validImage) {
              $rootScope.$broadcast(FILE_EVENTS.INVALID_TYPE);
            }
          }
        }

        function isValidFileImage(file) {
          return IMAGE_VALIDATIONS.TYPES.indexOf(file.type.split('/')[1]) >= 0;
        }

        function isValidFileSize(file) {
          return file.size <= IMAGE_VALIDATIONS.SIZE;
        }

        function handleLoadEnd(e) {
          file.base64 = e.target.result;

          $rootScope.$broadcast(broadcastEventName, file);
        }
      }


    }
  }

})(angular);

// assets/javascripts/image_select_directive.js
(function(angular) {

  var
    defintitions;

  defintitions = [
    'FileInput',
    'imageHandler',
    'FILE_EVENTS',
    'IMAGE_VALIDATIONS',
    chImageSelect
  ];

  angular.module('ch.FileSelect')
    .directive('chImageSelect', defintitions);

  function chImageSelect(FileInput, imageHandler, FILE_EVENTS, IMAGE_VALIDATIONS) {

    return {
      restrict: 'AC',
      replace: false,
      link: link
    };

    function link(scope, elem, attrs) {
      var
        input,
        fileInputConfig;

      fileInputConfig = {
        browse_button: elem[0],
        container: elem.parent()[0],
        accept: [
          {
            title: 'Image files',
            extensions: IMAGE_VALIDATIONS.TYPES
          }
        ],
        multiple: false
      };

      input = new FileInput(fileInputConfig);
      input.bind('change', imageHandler(FILE_EVENTS.SELECTED));
      input.init();
    }
  }

})(angular);

// assets/javascripts/vendor/moxie_module.js
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
    $window.mOxie.Env.swf_url = './flash/Moxie.swf';
    $window.mOxie.Env.xap_url = './silverlight/Moxie.xap';

    return $window.mOxie;
  }

  function fileInput(moxie) { return moxie.FileInput; }
  function fileDrop(moxie) { return moxie.FileDrop; }
  function fileReader(moxie) { return moxie.FileReader; }

})(angular);