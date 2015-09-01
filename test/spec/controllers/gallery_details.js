'use strict';

describe('Controller: GalleryDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('lolggApp'));

  var GalleryDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GalleryDetailsCtrl = $controller('GalleryDetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GalleryDetailsCtrl.awesomeThings.length).toBe(3);
  });
});
