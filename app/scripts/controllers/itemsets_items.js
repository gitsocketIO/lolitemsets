'use strict';

/**
 * @ngdoc function
 * @name lolggApp.controller:ItemsetsItemsCtrl
 * @description
 * # ItemsetsItemsCtrl
 * Controller of the lolggApp
 */
angular.module('lolggApp')
  .controller('ItemsetsItemsCtrl', function ($scope, $http, $routeParams,$location,lolItems, ngDialog) {
  	$scope.param = $routeParams;
  	$scope.itemInfos = lolItems.itemInfos;
    $scope.errors = "";
    $scope.infoTitleSet = {};
    $scope.addBloc = function ($listName) {
      var myCurrentListName = String.fromCharCode($listName.charCodeAt() + 1);
      $scope.itemInfos.lists[myCurrentListName]=[];
    };
    $scope.filterIncludes = [];
    
    $scope.includeFilter = function(tag) {
        var i = $.inArray(tag, $scope.filterIncludes);
        if (i > -1) {
            $scope.filterIncludes.splice(i, 1);
        } else {
            $scope.filterIncludes.push(tag);
        }
    }
    
    $scope.filterFilter = function(list) {
        var itemIncluded = false;
        var itemLoop = true;
        var tagsSearch = [];
        if ($scope.filterIncludes.length > 0) {
            angular.forEach(list.tags, function(item){
              tagsSearch.push(item);
            });
            angular.forEach($scope.filterIncludes, function(currTag){
              if(itemLoop == true){
                if ($.inArray(currTag, tagsSearch) >= 0){
                    itemIncluded = true;
                }
                else{
                  itemIncluded = false;
                  itemLoop=false;
                }
              }
            });
            if(itemIncluded == false){
              return;
            }
        }
        return list;
    }
    $scope.SelectedItem = function(item) {
      if($(".items_list_details_"+item.id).hasClass("item_desc_width")){
        $(".items_list_details_"+item.id).removeClass("item_desc_width");
        $(".items_list_details_"+item.id+' .item_desc').css('display','none');
      }
      else{
        $(".items_list_details_"+item.id).addClass('item_desc_width');
        $(".items_list_details_"+item.id+' .item_desc').css('display','block');
      }
    };

    $scope.getMyItemSet = function () {
        var titleSet=$scope.infoTitleSet.setTitle;
        var userNameSet=$scope.infoTitleSet.setUsername;
        var notempty = true;
        if(titleSet ==undefined || userNameSet==undefined){
          notempty = false;
        }
        if(notempty == true){
          var data = {
              "title": titleSet,
              "type": "custom",
              "map": $scope.param.map,
              "mode": "any",
              "priority": false,
              "sortrank": 0,
              "blocks": [
                  
              ]
          };
          angular.forEach(angular.element(".ul_list_Global"), function(value, key){
              var ulEl = angular.element(value);
              var titleBlock = ulEl.find('input').val();
              if(titleBlock ==undefined || titleBlock==''){
                notempty=false;
              }
              var currBlock = {
                      "type": titleBlock,
                      "recMath": false,
                      "minSummonerLevel": -1,
                      "maxSummonerLevel": -1,
                      "showIfSummonerSpell": "",
                      "hideIfSummonerSpell": "",
                      "items": [
                      ]
              };
              angular.forEach(ulEl.find(".items_list_details"), function(value, key){
                  var itemID = angular.element(value).find('p').text();
                  var curItem ={
                              "id": itemID,
                              "count": 1
                          };
                  currBlock.items.push(curItem);
              });
              data.blocks.push(currBlock);
          });
        if(notempty == true){
          $scope.errors = "";
          var json = JSON.stringify(data);
          var blob = new Blob([json], { type:"application/json;charset=utf-8;" });     
          var downloadLink = angular.element('<a></a>');
                            downloadLink.attr('href',window.URL.createObjectURL(blob));
                            downloadLink.attr('download', $scope.param.champion+titleSet+'.json');
          downloadLink[0].click();
        }
        else{
          $scope.errors = "Please fill all the fields !";
        }
      }
      else{
        $scope.errors = "Please fill all the fields !";
      }
    };

    $scope.shareMyItemSet = function () {
      var titleSet=$scope.infoTitleSet.setTitle;
        var userNameSet=$scope.infoTitleSet.setUsername;
        var notempty = true;
        if(titleSet ==undefined || userNameSet==undefined){
          notempty = false;
        }
        if(notempty == true){
          var data = {
              "title": titleSet,
              "type": "custom",
              "map": $scope.param.map,
              "mode": "any",
              "priority": false,
              "sortrank": 0,
              "blocks": [
                  
              ]
          };
          angular.forEach(angular.element(".ul_list_Global"), function(value, key){
              var ulEl = angular.element(value);
              var titleBlock = ulEl.find('input').val();
              if(titleBlock ==undefined || titleBlock==''){
                notempty=false;
              }
              var currBlock = {
                      "type": titleBlock,
                      "recMath": false,
                      "minSummonerLevel": -1,
                      "maxSummonerLevel": -1,
                      "showIfSummonerSpell": "",
                      "hideIfSummonerSpell": "",
                      "items": [
                      ]
              };
              angular.forEach(ulEl.find(".items_list_details"), function(value, key){
                  var itemID = angular.element(value).find('p').text();
                  var curItem ={
                              "id": itemID,
                              "count": 1
                          };
                  currBlock.items.push(curItem);
              });
              data.blocks.push(currBlock);
          });
        if(notempty == true){
          $scope.errors = "";
          var json = JSON.stringify(data);
          var jsonFileName = $scope.param.champion+titleSet+'.json';
          $http.post("api/saveJson.php", { "data" : json,"jsonFileName":jsonFileName,"userNameSet":userNameSet,"championName":$scope.param.champion}).
            success(function(data, status) {
              ngDialog.open({
                  template: '<img src="images/thxu.jpg" />',
                  plain: true
              });
            })
            .
            error(function(data, status) {
              console.log('fail');   
            });
        }
        else{
          $scope.errors = "Please fill all the fields !";
        }
      }
      else{
        $scope.errors = "Please fill all the fields !";
      }
    };

     $scope.getMyItemSetandShare = function () {
        $scope.getMyItemSet();
        $scope.shareMyItemSet();
     };

     $scope.removeList = function (index) {
      delete $scope.itemInfos.lists[index];
     };

  });
