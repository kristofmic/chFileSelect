describe('imageHandler', function() {

  var
    service,
    rootScope,
    mockEvent,
    mockFile,
    mockFileReader,
    mockFileReaderObject,
    FILE_EVENTS;

  beforeEach(module('ch.FileSelect'));

  beforeEach(module(function($provide) {
    mockFileReaderObject = {
      bind: function(eventName, cb) {
        cb(mockEvent);
      },
      readAsDataURL: sinon.spy()
    };

    mockFileReader = function() {
      this.bind = mockFileReaderObject.bind;
      this.readAsDataURL = mockFileReaderObject.readAsDataURL;
    };

    $provide.value('FileReader', mockFileReader);
  }));

  beforeEach(inject(function($rootScope, $injector) {
    rootScope = $rootScope;
    rootScope.$broadcast = sinon.spy();

    FILE_EVENTS = $injector.get('FILE_EVENTS');

    mockFile = {
      type: 'image/png',
      size: 20000
    };

    mockEvent = {
      target: {
        files: [ mockFile ],
        result: 'Foobar'
      }
    };

    service = $injector.get('imageHandler');

  }));

  it('should exist', function() {
    expect(service).to.not.be.undefined;
  });

  describe('handler', function() {

    it('should return a function', function() {
      expect(typeof service()).to.equal('function');
    });

    it('should read the file as a data url', function() {
      service()(mockEvent);

      expect(mockFileReaderObject.readAsDataURL.calledWith(mockFile)).to.be.true;
    });

    it('should broadcast the event passed in with the file object and base64', function() {
      service('myEvent')(mockEvent);

      expect(rootScope.$broadcast.calledWith('myEvent', mockFile)).to.be.true;
      expect(rootScope.$broadcast.getCall(0).args[1].base64).to.equal(mockEvent.target.result);
    });

    describe('invalid files', function() {
      beforeEach(function() {
        mockFile.type = 'pdf';
        mockFile.size = 999999999999;
      });

      it('should not read the file', function() {
        service()(mockEvent);

        expect(mockFileReaderObject.readAsDataURL.called).to.be.false;
      });

      it('should not read the file', function() {
        service()(mockEvent);

        expect(rootScope.$broadcast.calledWith(FILE_EVENTS.INVALID)).to.be.true;
      });
    });

  });

});