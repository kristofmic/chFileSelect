describe('chImageDrop', function() {

  var
    scope,
    imageElement,
    mockFileDrop,
    mockFileDropObject,
    mockFileDropSettings,
    mockImageHandler,
    FILE_EVENTS,
    IMAGE_VALIDATIONS;

  beforeEach(module('ch.FileSelect'));

  beforeEach(module(function($provide) {
    mockFileDropObject = {
      bind: sinon.spy(),
      init: sinon.spy()
    };

    mockFileDropSettings = undefined;

    mockFileDrop = function(settings) {
      mockFileDropSettings = settings;

      this.bind = mockFileDropObject.bind;
      this.init = mockFileDropObject.init;
    };

    mockImageHandler = sinon.spy();

    $provide.value('FileDrop', mockFileDrop);
    $provide.value('imageHandler', mockImageHandler);
  }));

  beforeEach(inject(function($rootScope, $compile, $injector) {
    scope = $rootScope.$new();

    FILE_EVENTS = $injector.get('FILE_EVENTS');
    IMAGE_VALIDATIONS = $injector.get('IMAGE_VALIDATIONS');

    imageElement = angular.element('<div ch-image-drop ></div>');

    $compile(imageElement)(scope);

    scope.$digest();
  }));

  it('should exist', function() {
    expect(imageElement).to.not.be.undefined;
  });

  describe('linker', function() {
    var
      localScope;

    beforeEach(function() {
      localScope = imageElement.isolateScope();
    });

    it('should create the FileInput object tailored to images', function() {
      expect(mockFileDropSettings.drop_zone).to.equal(imageElement[0]);
      expect(mockFileDropSettings.accept[0].title).to.equal('Image files');
      expect(mockFileDropSettings.accept[0].extensions).to.equal(IMAGE_VALIDATIONS.TYPES);
    });

    it('should bind to the change event on the file input object passing in the handler', function() {
      expect(mockFileDropObject.bind.calledWith('drop')).to.be.true;
      expect(mockImageHandler.calledWith(FILE_EVENTS.DROPPED)).to.be.true;
    });

    it('should init the file input object', function() {
      expect(mockFileDropObject.init).to.have.been.called;
    });

  });

});