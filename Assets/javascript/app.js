$(document).on('ready', function() {
    //api information to firebase database
    var config = {
        apiKey: "AIzaSyBGQrA-P1mbh3rO0qqfoIXzxT_HUP1LM_o",
        authDomain: "timesheet-e4137.firebaseapp.com",
        databaseURL: "https://timesheet-e4137.firebaseio.com",
        projectId: "timesheet-e4137",
        storageBucket: "timesheet-e4137.appspot.com",
        messagingSenderId: "19116777432"
    };
    firebase.initializeApp(config);

    //declaring database to variable
    var database = firebase.database();

    //declaring submit button variable
    const submit = $('#submit');


})