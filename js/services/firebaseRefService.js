angular.module("myApp").factory("firebaseRef", ["config", "$firebaseObject", "$firebaseArray",
    function (config, $firebaseObject, $firebaseArray) {
        var _ref = new Firebase(config.baseURL),
            _resolveRef = function (parentRef, childName, returnType) {
                return returnType(parentRef.child(childName));
            },
            _resolveRefObject = function (parentRef, childName) {
                return _resolveRef(parentRef, childName, $firebaseObject);
            },
            _resolveRefArray = function (parentRef, childName) {
                return _resolveRef(parentRef, childName, $firebaseArray);
            },
            _about = function () {
                return _resolveRefObject(_ref, config.aboutChild);
            },
            _messages = function () {
                return _resolveRefArray(_ref, config.messagesChild);
            };
        return {
            getAbout: _about,
            getMessages: _messages
        };
    }
]);
