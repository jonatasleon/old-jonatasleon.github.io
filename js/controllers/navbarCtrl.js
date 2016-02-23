angular.module("myApp").controller("NavbarCtrl", ["$scope", "$location", "routes",
    function ($scope, $location, routes) {
        $scope.routes = routes;
        $scope.isActive = function (route) {
            return route === $location.path();
        }
    }
]);
