angular.module("myApp").controller("NavbarCtrl", ["$scope", "$location", "routes",
    function ($scope, $location, routes) {
        var count = 0;
        $scope.routes = routes;
        $scope.isActive = function (regex) {
            return $location.path().match(new RegExp(regex));
        };
    }
]);
