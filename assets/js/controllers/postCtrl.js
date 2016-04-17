angular.module("myApp").controller("PostCtrl", ["$scope", "post", "firebaseRef",
    function($scope, post, firebaseRef) {
        $scope.post = post;
    }
]);
