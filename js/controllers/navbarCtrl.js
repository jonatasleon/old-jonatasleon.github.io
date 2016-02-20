angular.module("myApp").controller("NavbarCtrl", ["$scope", "$location",
    function ($scope, $location) {
        $scope.routes = {
            "homepage": {
                name: "Homepage",
                path: "/"
            },
            "about": {
                name: "About",
                path: "/about"
            }
        };
        $scope.isActive = function (route) {
            return route === $location.path();
        }
    }
]);
