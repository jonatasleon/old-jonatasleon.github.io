angular.module("myApp").controller("ContactCtrl", ["$scope", "addMessage",
    function ($scope, addMessage) {
        function init() {
            var fakeMessage = messageFactory("Jonatas", "", "", "");
            addMessage(fakeMessage).then(success, error);
        }

        function messageFactory(author, email, subject, content) {
            return {
                author: author,
                email: email,
                subject: subject,
                content: content,
                dateTime: new Date()
            };
        }

        function success(ref) {
            var id = ref.key();
            console.log(id);
        }

        function error(err) {
            console.log(err);
        }

        init();
    }
]);
