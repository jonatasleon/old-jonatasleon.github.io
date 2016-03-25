angular.module("myApp").controller("HomepageCtrl", ["$scope", "info",
    function ($scope, info) {
        $scope.info = info;
        $scope.info.$loaded().then(function () {
            $scope.isLoaded = true;
        });
    }
]);
