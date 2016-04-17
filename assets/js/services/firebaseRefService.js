angular.module("myApp").factory("firebaseRef", ["config", "$firebaseObject", "$firebaseArray",
    function (config, $firebaseObject, $firebaseArray) {
        var firebase = new Firebase(config.baseURL);

        function _about() {
            return _getObject(firebase, config.aboutChild);
        }

        function _addMessage(message) {
            return _getArray(firebase, config.messagesChild).$add(message);
        }

        function _getPosts() {
            return _getObject(firebase, config.blogChild);
        }


        function _getPost(id) {
            return _getObject(firebase, config.blogChild, "posts", id);
        }

        function _getText(id) {
            return _getObject(firebase, config.blogChild, "texts", id);
        }

        function _getObject() {
            var ref = _resolveRef(arguments);
            return $firebaseObject(ref);
        }

        function _getArray() {
            var ref = _resolveRef(arguments);
            return $firebaseArray(ref);
        }

        function _resolveRef(args) {
            var ref = args[0],
                length = args.length;
            for (var i = 1; i < length; i++) {
                ref = ref.child(args[i]);
            }
            return ref;
        }

        return {
            getAbout: _about,
            getBlog: _getPosts,
            getPost: _getPost,
            getText: _getText,
            addMessage: _addMessage
        };
    }
]);
