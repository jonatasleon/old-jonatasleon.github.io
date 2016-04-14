angular.module("myApp").factory("firebaseRef", ["config", "$firebaseObject", "$firebaseArray",
    function (config, $firebaseObject, $firebaseArray) {
        var _ref = new Firebase(config.baseURL);

        function _about() {
            return _getObject(_ref, config.aboutChild);
        }

        function _addMessage(message) {
            return _getArray(_ref, config.messagesChild).$add(message);
        }

        function _getObject(parentRef, childName) {
            return $firebaseObject(parentRef.child(childName));
        }

        function _getArray(parentRef, childName) {
            return $firebaseArray(parentRef.chil(childName));
        }

        return {
            getAbout: _about,
            addMessage: _addMessage
        };
    }
]);
