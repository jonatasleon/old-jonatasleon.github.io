angular.module("myApp").controller("ContactCtrl", ["$scope", "addMessage",
    function ($scope, addMessage) {
        var fakeMessage = {author: "Jonatas", content: "test", dateTime: "2016-02-02T10:12:28-02:00", email: "", subject: ""};

        function onSuccess(ref) {
            var id = ref.key();
            console.log(id);
        }

        function onError() {
            console.log("LASCOU-SE");
        }

        addMessage(fakeMessage).then(onSuccess, onError);
    }
]);
