describe('chImageSelect', function() {

  var
    scope,
    imageElement,
    mockFileInput,
    mockFileInputObject,
    mockFileInputSettings,
    mockImageHandler,
    FILE_EVENTS,
    IMAGE_VALIDATIONS;

  beforeEach(module('ch.FileSelect'));

  beforeEach(module(function($provide) {
    mockFileInputObject = {
      bind: sinon.spy(),
      init: sinon.spy()
    };

    mockFileInputSettings = undefined;

    mockFileInput = function(settings) {
      mockFileInputSettings = settings;

      this.bind = mockFileInputObject.bind;
      this.init = mockFileInputObject.init;
    };

    mockImageHandler = sinon.spy();

    $provide.value('FileInput', mockFileInput);
    $provide.value('imageHandler', mockImageHandler);
  }));

  beforeEach(inject(function($rootScope, $compile, $injector) {
    scope = $rootScope.$new();

    FILE_EVENTS = $injector.get('FILE_EVENTS');
    IMAGE_VALIDATIONS = $injector.get('IMAGE_VALIDATIONS');

    imageElement = angular.element('<div ch-image-select ></div>');

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
      expect(mockFileInputSettings.browse_button).to.equal(imageElement[0]);
      expect(mockFileInputSettings.container).to.equal(imageElement.parent()[0]);
      expect(mockFileInputSettings.accept[0].title).to.equal('Image files');
      expect(mockFileInputSettings.accept[0].extensions).to.equal(IMAGE_VALIDATIONS.TYPES);
      expect(mockFileInputSettings.multiple).to.equal(false);
    });

    it('should bind to the change event on the file input object passing in the handler', function() {
      expect(mockFileInputObject.bind.calledWith('change')).to.be.true;
      expect(mockImageHandler.calledWith(FILE_EVENTS.SELECTED)).to.be.true;
    });

    it('should init the file input object', function() {
      expect(mockFileInputObject.init).to.have.been.called;
    });

  });

});