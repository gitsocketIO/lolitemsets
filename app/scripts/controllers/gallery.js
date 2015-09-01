'use strict';

/**
 * @ngdoc function
 * @name lolggApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the lolggApp
 */
angular.module('lolggApp')
  .controller('GalleryCtrl', function ($scope, $http,$location,lolChampion,getJson) {
  	$scope.itemSetData = getJson.jsonData;
  	$scope.championInfos = lolChampion.championInfo;
    
	$scope.getMyItemSet = function (data,setName,championName) {
          var json = JSON.stringify(data);
          var blob = new Blob([json], { type:"application/json;charset=utf-8;" });     
          var downloadLink = angular.element('<a></a>');
                            downloadLink.attr('href',window.URL.createObjectURL(blob));
                            downloadLink.attr('download', championName+setName+'.json');
          downloadLink[0].click();
    };
    $scope.addLike = function (folderName,obj) {
    	$http.post("api/setLike.php", { "folderName" : folderName}).
        success(function(data, status) {
          obj.like=data;
        })
        .
        error(function(data, status) {
          console.log('fail');   
        });
    };
    $scope.itemsetdetail = function (folderName) {
      $location.path('/gallery/'+ folderName);
    };

  });
