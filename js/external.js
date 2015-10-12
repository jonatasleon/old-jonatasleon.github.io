var firebaseRef = new Firebase('https://dazzling-torch-5140.firebaseio.com');

function send() {
    console.log("I'm here");

    var newMsgRef = firebaseRef.child("messages").push();

    var author = document.getElementById("author");
    var email = document.getElementById('email');
    var message = document.getElementById('content');
    var subject = document.getElementById('subject');

    newMsgRef.set({
        author: author.value,
        email: email.value,
        message: message.value,
        subject: subject.value,
        date_time: moment().format()
    });

    author.value = '';
    email.value = '';
    message.value = '';
    subject.value = '';

};
