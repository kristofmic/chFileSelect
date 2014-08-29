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
      }

      function handleLoadEnd(e) {
        $rootScope.$broadcast(broadcastEventName, e.target.result);
      }
    }
  }

})(angular);