angular.module("myApp").config(["$routeProvider", "routes",
    function($routeProvider, routes) {
        $routeProvider
            .when(routes.homepage.path, {
                templateUrl: "./partials/homepage.html",
                controller: "HomepageCtrl",
                resolve: {
                    info: function(firebaseRef) {
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
                    blog: function(firebaseRef) {
                        return firebaseRef.getBlog();
                    }
                }
            })
            .when(routes.blog.path + "/:id", {
                templateUrl: "./partials/post.html",
                controller: "PostCtrl",
                css: "<link href='https://fonts.googleapis.com/css?family=Vollkorn:400,700,400italic,700italic' rel='stylesheet' type='text/css'>",
                resolve: {
                    post: function(firebaseRef, $route) {
                        var post = firebaseRef.getPost($route.current.params.id);
                        post.$loaded().then(function() {
                            var text = firebaseRef.getText(this.texts);
                            text.$loaded().then(function() {
                                this.text = text.$value;
                            }.bind(this));
                        }.bind(post));
                        return post;
                    }
                }
            })
            .otherwise({
                redirectTo: routes.homepage.path
            });
    }
]);
