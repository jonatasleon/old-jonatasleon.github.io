angular.module("myApp").config(["$routeProvider", "routes",
    function($routeProvider, routes) {
        $routeProvider
            .when(routes.homepage.path, {
                templateUrl: "./partials/homepage.html",
                controller: "HomepageController",
                resolve: {
                    info: function(firebaseRef) {
                        return firebaseRef.getAbout();
                    }
                }
            })
            // .when(routes.contact.path, {
            //     templateUrl: "./partials/contact.html",
            //     controller: "ContactController",
            //     resolve: {
            //         addMessage: function (firebaseRef) {
            //                 return firebaseRef.addMessage;
            //         }
            //     }
            // })
            .otherwise({
                redirectTo: routes.homepage.path
            });
    }
]);
