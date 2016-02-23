angular.module("myApp").controller("ContactCtrl", ["$scope", "addMessage",
    function ($scope, addMessage) {
        addMessage({author: "Jonatas", content: "test", dateTime: "2016-02-02T10:12:28-02:00", email: "", subject: ""}).then(function (ref) {
            var id = ref.key();
            console.log(id);
        }, function () {
            console.log("LASCOU-SE");
        });
    }
]);
