angular.module("myApp").controller("BlogCtrl", ["$scope", "blog",
    function($scope, blog) {
        $scope.posts = [];

        blog.$loaded().then(function() {
            angular.forEach(this.posts, function(data) {
                data.createdOn = new Date(data.createdOn);
                $scope.posts.push(data);
            });
        }.bind(blog));
    }
]);
