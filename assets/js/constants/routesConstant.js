angular.module("myApp").constant("routes", {
    homepage: {
        name: "Home",
        path: "/",
        regex: "^/$"
    // },
    // contact: {
    //     name: "Contact",
    //     path: "/contact"
    },
    blog: {
        name: "Blog",
        path: "/blog",
        regex: "^/blog"
    }
});
