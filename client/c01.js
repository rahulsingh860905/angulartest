var app = angular.module("app", []);

// Example for service via Provider and Config

app.controller("appController", ["$scope", "appService", function($scope, appService) {
    $scope.a = 10;
    $scope.b = 20;

    $scope.calculateSum = function() {
        appService.doSum($scope.a, $scope.b, function(result) {
            $scope.sum = result;
        });
    };

}]);

app.provider('appService', [function() {

    var baseURL;
    this.config = function(url){
        baseURL = url;
    }


    this.$get = ['$log', '$http', function($log, $http) {

        $log.log("Factory initiating ...");

        var appService1 = {};
        appService1.doSum = function(a, b, cb) {
            $http({
                url: baseURL + "/sum?a=" + a + "&b=" + b,
                method: "GET"
            }).then(function(resp) {
                cb(parseInt(resp.data));
            }, function(error) {
                cb(-1);
            })
        };
        return appService1;

    }];
}])

app.config(["appServiceProvider", function(appServiceProvider) {
    appServiceProvider.config("http://127.0.0.1:4467");
}])

// Example for service via Service

// app.controller("appController", ["$scope", "appService", function($scope, appService) {
//     $scope.a = 10;
//     $scope.b = 20;

//     $scope.calculateSum = function() {
//         appService.doSum($scope.a, $scope.b, function(result) {
//             $scope.sum = result;
//         });
//     };

// }]);

// app.service('appService', ["$http", "$log", function($http, $log) {

//     $log.log("Service initiating ...");

//     this.doSum = function(a, b, cb) {
//         $http({
//             url: "http://127.0.0.1:4467/sum?a=" + a + "&b=" + b,
//             method: "GET"
//         }).then(function(resp) {
//             cb(parseInt(resp.data));
//         }, function(error) {
//             cb(-1);
//         })
//     };
// }]);


// Example for service via factory

// app.controller("appController", ["$scope", "appFactory", function($scope, appFactory) {
//     $scope.a = 10;
//     $scope.b = 20;

//     $scope.calculateSum = function(){
//         appFactory.doSum($scope.a,$scope.b,function(result){
//             $scope.sum = result;
//         });
//     };

// }]);

// app.factory('appFactory', ["$http", "$log", function ($http,$log) {
//     $log.log("Factory initiating ...");

//     var appService = {};
//     appService.doSum = function(a,b,cb) {
//         $http({
//             url: "http://127.0.0.1:4467/sum?a=" + a + "&b=" + b,
//             method: "GET"
//         }).then(function(resp) {
//             cb(parseInt(resp.data));
//         }, function(error) {
//             cb(-1);
//         })
//     };
//     return appService;
// }]);
