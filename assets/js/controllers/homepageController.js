angular.module("myApp").controller("HomepageController", ["$scope", "info",
    function ($scope, info) {
        $scope.info = info;
        $scope.info.$loaded().then(function () {
            $scope.isLoaded = true;
        });
    }
]);
