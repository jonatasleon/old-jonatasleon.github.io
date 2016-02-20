angular.module("myApp", ["firebase", "ngRoute", "ngAnimate"]);

angular.module("myApp").config(function ($routeProvider) {
    $routeProvider
        .when("/about", {
            templateUrl: "./view/about.html",
            controller: "AboutCtrl",
            resolve: {
                info: function (firebaseRef) {
                    return firebaseRef.getAbout();
                }
            }
        })
        .otherwise({
            redirectTo: "/about"
        });
});
