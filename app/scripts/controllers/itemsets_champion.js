'use strict';

/**
 * @ngdoc function
 * @name lolggApp.controller:ChampionCtrl
 * @description
 * # ChampionCtrl
 * Controller of the lolggApp
 */
angular.module('lolggApp')
  .controller('ChampionCtrl', function ($scope, $http, $routeParams,$location,lolChampion) {
  	$scope.param = $routeParams.map;
  	$scope.championInfos = lolChampion.championInfo;
    angular.element(".loading").css('height',$(window).height()+'px');
    $scope.$watch(function(){
      if(lolChampion.championInfo.length>125){
        angular.element(".loading").addClass('hidden');
      }
    });
    $scope.itemsetChampion = function (championName) {
      $location.path('/itemsets/'+ $scope.param + '/' + championName);
    };
  });
