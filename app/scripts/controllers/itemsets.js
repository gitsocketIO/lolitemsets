'use strict';

/**
 * @ngdoc function
 * @name lolggApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lolggApp
 */
angular.module('lolggApp')
  .controller('ItemSets', function ($scope,$location,$route) {
  	$scope.checkboxModel = {
       value1 : 'SummonersRift',
       value2 : 'NO',
       value3 : 'NO'
    };
	$scope.itemsetMap = function () {
	   var mapchoosen = 'SR';
	   if($scope.checkboxModel.value1 == 'SummonersRift' && $scope.checkboxModel.value2 == 'TwistedTreeline' && $scope.checkboxModel.value3 == 'HowlingAbyss'){
	   		mapchoosen = 'any';
	   }
	   if($scope.checkboxModel.value1 == 'SummonersRift' && $scope.checkboxModel.value2 == 'TwistedTreeline' && $scope.checkboxModel.value3 == 'NO'){
	   		mapchoosen = 'SR,TT';
	   }
	   if($scope.checkboxModel.value1 == 'SummonersRift' && $scope.checkboxModel.value2 == 'NO' && $scope.checkboxModel.value3 == 'HowlingAbyss'){
	   		mapchoosen = 'SR,HA';
	   }
	   if($scope.checkboxModel.value1 == 'SummonersRift' && $scope.checkboxModel.value2 == 'NO' && $scope.checkboxModel.value3 == 'NO'){
	   		mapchoosen = 'SR';
	   }
	   if($scope.checkboxModel.value1 == 'NO' && $scope.checkboxModel.value2 == 'TwistedTreeline' && $scope.checkboxModel.value3 == 'NO'){
	   		mapchoosen = 'TT';
	   }
	   if($scope.checkboxModel.value1 == 'NO' && $scope.checkboxModel.value2 == 'TwistedTreeline' && $scope.checkboxModel.value3 == 'HowlingAbyss'){
	   		mapchoosen = 'TT,HA';
	   }
	   if($scope.checkboxModel.value1 == 'NO' && $scope.checkboxModel.value2 == 'NO' && $scope.checkboxModel.value3 == 'HowlingAbyss'){
	   		mapchoosen = 'HA';
	   }
	   $location.path('/itemsets/'+ mapchoosen);
	   /*$window.location.reload();*/
	};
  });
