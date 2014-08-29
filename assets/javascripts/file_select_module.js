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