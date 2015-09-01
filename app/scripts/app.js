'use strict';

/**
 * @ngdoc overview
 * @name lolggApp
 * @description
 * # lolggApp
 *
 * Main module of the application.
 */
 var app = angular.module("lolggApp",[
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'dndLists',
    'ngDialog'
  ]);

app.factory("getJson", function ($http) {  
  var jsonData = [];
  $http.get("api/getJson.php").
    success(function(data, status) {
      jsonData.push(data);
    })
    .
    error(function(data, status) {
      console.log('fail');   
    });
  return {
    jsonData: jsonData
  };
});

app.factory("lolChampion", function ($http) {  
  var championInfos = [];
  $http.get('mycustomapi').
    success(function(data) {
      angular.forEach(data, function(value, key) {
        angular.forEach(value, function(value, key) {
          $http.get('mycustomChamp/'+value.id+'').
          success(function(dataChampion) {
              championInfos.push(dataChampion);
          });
        });
    });
  });
  return {
    championInfo: championInfos
  };
});

app.factory("lolItems", function ($http) {  
  var itemInfos = {
        selected: null,
        lists: {"A": [], "B": []}
  };
  $http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/item?itemListData=all&api_key=be1e623c-3555-4644-a99d-2fd97d66d7c9').
    success(function(data) {
         angular.forEach(data.data, function(item){
              itemInfos.lists.A.push(item);
         });
        
    });
  return {
    itemInfos:itemInfos
  };
});

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/itemsets', {
        templateUrl: 'views/itemsets.html',
        controller: 'ItemSets',
        controllerAs: 'itemsets'
      })
      .when('/itemsets/:map', {
        templateUrl: 'views/itemsets_champion.html',
        controller: 'ChampionCtrl',
        controllerAs: 'champion'
      })
      .when('/itemsets/:map/:champion', {
        templateUrl: 'views/itemsets_items.html',
        controller: 'ItemsetsItemsCtrl',
        controllerAs: 'itemsetsItems'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/gallery', {
        templateUrl: 'views/gallery.html',
        controller: 'GalleryCtrl',
        controllerAs: 'gallery'
      })
      .when('/gallery/:foldername', {
        templateUrl: 'views/gallery_details.html',
        controller: 'GalleryDetailsCtrl',
        controllerAs: 'galleryDetails'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.directive('bsActiveLink', ['$location', function ($location) {
return {
    restrict: 'A', //use as attribute 
    replace: false,
    link: function (scope, elem) {
        //after the route has changed
        scope.$on("$routeChangeSuccess", function () {
            var hrefs = ['/#' + $location.path(),
                         '#' + $location.path(), //html5: false
                         $location.path()]; //html5: true
            angular.forEach(elem.find('a'), function (a) {
                a = angular.element(a);
                var arrHref=a.attr('href').split('/');
                var arrChref = $location.path().split('/');
                if (-1 !== $.inArray(arrChref[1],arrHref)) {
                    a.parent().addClass('active');
                } else {
                    a.parent().removeClass('active');   
                };
            });     
        });
    }
}
}]);
