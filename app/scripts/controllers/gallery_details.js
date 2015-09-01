'use strict';

/**
 * @ngdoc function
 * @name lolggApp.controller:GalleryDetailsCtrl
 * @description
 * # GalleryDetailsCtrl
 * Controller of the lolggApp
 */
angular.module('lolggApp')
  .controller('GalleryDetailsCtrl', function ($scope, $http, $routeParams,lolChampion,getJson,lolItems) {
  	$scope.param = $routeParams.foldername;
    $scope.itemSetData = getJson.jsonData;
  	$scope.championInfos = lolChampion.championInfo;
  	$scope.itemInfos = lolItems.itemInfos;

  	$scope.SelectedItem = function(item) {
      if($(".set_gallery_detail_item_"+item.id).hasClass("item_desc_width")){
        $(".set_gallery_detail_item_"+item.id).removeClass("item_desc_width");
        $(".set_gallery_detail_item_"+item.id+' .item_desc').css('display','none');
      }
      else{
        $(".set_gallery_detail_item_"+item.id).addClass('item_desc_width');
        $(".set_gallery_detail_item_"+item.id+' .item_desc').css('display','block');
      }
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

  });
