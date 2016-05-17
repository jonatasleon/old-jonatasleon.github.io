angular.module("myApp").controller("PostController", ["$scope", "post", "firebaseRef",
    function($scope, post, firebaseRef) {
        $scope.post = post;
    }
]);
