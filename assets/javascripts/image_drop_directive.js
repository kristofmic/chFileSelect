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