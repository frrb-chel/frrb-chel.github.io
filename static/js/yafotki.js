angular.module("Fotki", [])
    .value("options", {
        user: "frrb-chel"
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'list.html', controller: 'ListCtrl'})
            .when('/:albumId', {templateUrl: 'item.html', controller: 'AlbumCtrl'});
    }])
    .controller("ListCtrl", function($scope, $http, $window, options) {
        $scope.loading = true;
        $http.jsonp("http://api-fotki.yandex.ru/api/users/"+options.user+"/albums/?format=json&callback=JSON_CALLBACK")
            .success(function(data, status) {
                $window.document.title = "Фотоальбомы";
                $scope.albums = data.entries;
                $scope.loading = false;
            });
    })
    .controller("AlbumCtrl", function($scope, $routeParams, $http, $window, options) {
        $scope.loading = true;
        $http.jsonp("http://api-fotki.yandex.ru/api/users/"+options.user+"/album/"+$routeParams.albumId+"/photos/?format=json&callback=JSON_CALLBACK")
            .success(function(data, status) {
                $scope.album = data;
                $scope.photos = data.entries;
                $window.document.title = data.title;
                $scope.loading = false;
            });
    })
    .directive("grid", function() {
        return function(scope, el, attrs) {
            scope.$watch("loading", function() {
                new Masonry($("ul.thumbnails").get(0), {
                    columnWidth: 240
                });
            }); 
        }
    })
    .directive("album", function() {
        return function(scope, el, attrs) {
            scope.$watch("photos", function() {
                $(el).find('.thumbnails a').colorbox();
                new Masonry($("ul.thumbnails").get(0), {
                    columnWidth: 240
                });
            }); 
        }
    })
    .filter('albumId', function() {
        return function(input) {
            return input.split(":").slice(-1)[0];
        };
    });