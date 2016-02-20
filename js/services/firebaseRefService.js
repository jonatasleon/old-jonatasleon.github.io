angular.module("myApp").factory("firebaseRef", ["config", "$firebaseObject", "$firebaseArray",
    function (config, $firebaseObject, $firebaseArray) {
        var _ref = new Firebase(config.baseURL);

        function _about() {
            return _resolveRefObject(_ref, config.aboutChild);
        }

        function _messages() {
            return _resolveRefArray(_ref, config.messagesChild);
        }

        function _resolveRefObject(parentRef, childName) {
            return _resolveRef(parentRef, childName, $firebaseObject);
        }

        function _resolveRefArray(parentRef, childName) {
            return _resolveRef(parentRef, childName, $firebaseArray);
        }

        function _resolveRef(parentRef, childName, callbackType) {
            return callbackType(parentRef.child(childName));
        }

        return {
            getAbout: _about,
            getMessages: _messages
        };
    }
]);
