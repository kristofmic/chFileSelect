
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
    $window.mOxie.Env.swf_url = './Moxie.swf';
    $window.mOxie.Env.xap_url = './Moxie.xap';

    return $window.mOxie;
  }

  function fileInput(moxie) { return moxie.FileInput; }
  function fileDrop(moxie) { return moxie.FileDrop; }
  function fileReader(moxie) { return moxie.FileReader; }

})(angular);

// assets/javascripts/file_select_module.js
(function(angular) {

  var dependencies;

  dependencies = [
    'ch.Vendor.Moxie'
  ];

  angular.module('ch.FileSelect', dependencies)
    .constant('FILE_EVENTS', {
      SELECTED: 'fileSelect:selected',
      DROPPED: 'fileSelect:dropped',
      INVALID_TYPE: 'fileSelect:invalid:type',
      INVALID_SIZE: 'fileSelect:invalid:size',
      INVALID: 'fileSelect:invalid'
    })
    .constant('IMAGE_VALIDATIONS', {
      SIZE: 2000000,
      TYPES: 'jpg,jpeg,svg,png'
    });

})(angular);

// assets/javascripts/image_drop_directive.js
(function(angular) {

  var
    defintitions;

  defintitions = [
    'FileDrop',
    'FileReader',
    'FILE_EVENTS',
    'IMAGE_VALIDATIONS',
    chImageDrop
  ];

  angular.module('ch.FileUpload')
    .directive('chImageDrop', defintitions);

  function chImageDrop(FileDrop, FileReader, FILE_EVENTS, IMAGE_VALIDATIONS) {

    return {
      restrict: 'AC',
      replace: false,
      link: link,
      scope: {}
    };

    function link(scope, elem, attrs) {
      var
        drop,
        reader,
        fileDropConfig,
        file;

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
      drop.bind('drop', onFileDrop);
      drop.init();

      reader = new FileReader();
      reader.bind('loadend', onFileReaderLoadEnd);

      function onFileDrop(e) {
        var
          files = e.target.files,
          validSize,
          validImage;

        if (files.length) {
          file = files[0];
          validSize = isValidFileSize(file);
          validImage = isValidFileImage(file);

          if (validSize && validImage) {
            reader.readAsDataURL(file);
          }
          else {
            if (!validSize && !validImage) {
              scope.$emit(FILE_EVENTS.INVALID);
            }
            else if (!validSize) {
              scope.$emit(FILE_EVENTS.INVALID_SIZE);
            }
            else if (!validImage) {
              scope.$emit(FILE_EVENTS.INVALID_TYPE);
            }
          }
        }

        function isValidFileImage(file) {
          return IMAGE_VALIDATIONS.TYPES.indexOf(file.type.split('/')[1]) >= 0;
        }

        function isValidFileSize(file) {
          return file.size <= IMAGE_VALIDATIONS.SIZE;
        }
      }

      function onFileReaderLoadEnd(e) {
        scope.$emit(FILE_EVENTS.SELECTED, file, e.target.result);
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
    'FileReader',
    'FILE_EVENTS',
    'IMAGE_VALIDATIONS',
    chImageSelect
  ];

  angular.module('ch.FileUpload')
    .directive('chImageSelect', defintitions);

  function chImageSelect(FileInput, FileReader, FILE_EVENTS, IMAGE_VALIDATIONS) {

    return {
      restrict: 'AC',
      replace: false,
      link: link,
      scope: {}
    };

    function link(scope, elem, attrs) {
      var
        input,
        reader,
        fileInputConfig,
        file;

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
      input.bind('change', onFileInputChange);
      input.init();

      reader = new FileReader();
      reader.bind('loadend', onFileReaderLoadEnd);

      function onFileInputChange(e) {
        var
          files = e.target.files,
          validSize,
          validImage;

        if (files.length) {
          file = files[0];
          validSize = isValidFileSize(file);
          validImage = isValidFileImage(file);

          if (validSize && validImage) {
            reader.readAsDataURL(file);
          }
          else {
            if (!validSize && !validImage) {
              scope.$emit(FILE_EVENTS.INVALID);
            }
            else if (!validSize) {
              scope.$emit(FILE_EVENTS.INVALID_SIZE);
            }
            else if (!validImage) {
              scope.$emit(FILE_EVENTS.INVALID_TYPE);
            }
          }
        }

        function isValidFileImage(file) {
          return IMAGE_VALIDATIONS.TYPES.indexOf(file.type.split('/')[1]) >= 0;
        }

        function isValidFileSize(file) {
          return file.size <= IMAGE_VALIDATIONS.SIZE;
        }
      }

      function onFileReaderLoadEnd(e) {
        scope.$emit(FILE_EVENTS.SELECTED, file, e.target.result);
      }
    }
  }

})(angular);