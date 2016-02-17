angular.module("myApp").controller("AboutCtrl", ["$scope", "info",
    function ($scope, info) {
        $scope.info = info;
        $scope.info.$loaded().then(function () {
            $scope.isLoaded = true;
        });
    }
]);
