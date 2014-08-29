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