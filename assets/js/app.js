angular.module("myApp", ["firebase", "ngRoute", "ngAnimate"]);

angular.module("myApp").config(function ($routeProvider, routes) {
    $routeProvider
        .when(routes.homepage.path, {
            templateUrl: "./partials/homepage.html",
            controller: "HomepageCtrl",
            resolve: {
                info: function (firebaseRef) {
                    return firebaseRef.getAbout();
                }
            }
        })
        // .when(routes.contact.path, {
        //     templateUrl: "./partials/contact.html",
        //     controller: "ContactCtrl",
        //     resolve: {
        //         addMessage: function (firebaseRef) {
        //                 return firebaseRef.addMessage;
        //         }
        //     }
        // })
        .when(routes.blog.path, {
            templateUrl: "./partials/blog.html",
            controller: "BlogCtrl",
            resolve: {
                blog: function (firebaseRef) {
                    var blog = firebaseRef.getBlog();
                    blog.truco = "TRUCOOOOOOOOOOO!";
                    return blog;
                }
            }
        })
        .otherwise({
            redirectTo: routes.homepage.path
        });
});
