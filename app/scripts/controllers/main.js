'use strict';

/**
 * @ngdoc function
 * @name lolggApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lolggApp
 */
angular.module('lolggApp')
  .controller('MainCtrl', function ($scope, $http,$location,getJson,lolChampion) {
  	$scope.itemSetData = getJson.jsonData;
  	$scope.championInfos = lolChampion.championInfo;
	$scope.searchSummoner = function () {
	   $location.path('/summoner/'+ $scope.summoner_name);
	};
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
