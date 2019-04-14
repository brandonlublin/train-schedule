$(document).ready(function () {
    //api information to firebase database
    var config = {
        apiKey: "AIzaSyDTe8NJrKonGMYUBFqHvR59PjCbaFKpSuE",
        authDomain: "train-schedule-8639d.firebaseapp.com",
        databaseURL: "https://train-schedule-8639d.firebaseio.com",
        projectId: "train-schedule-8639d",
        storageBucket: "train-schedule-8639d.appspot.com",
        messagingSenderId: "693953622522"
    };
    firebase.initializeApp(config);

    //declaring database to variable
    var database = firebase.database();

    //declaring submit button variable
    const submit = $('#submit');
    
    //setting each entry from the user to blank after submit button clicked
    function clearInputs() {
        $(".form-control").val("");
    }

    //setting what happens on submit button
    submit.on('click', function () {
        event.preventDefault();

        //establishing each variable from user input in each folder
        let train = $('#trainName').val().trim();
        let destinationLocation = $('#destination').val().trim();
        let trainTimeInitial = $('#firstTrainTime').val().trim();
        let timeInterval = $('#frequency').val().trim()
        
        //pushing each entry from user into firebase database 
        database.ref().push({
            trainName: train,
            destination: destinationLocation,
            trainStart: trainTimeInitial,
            timing: timeInterval,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        clearInputs();
    });

    //query database to assign each field in the db to a new table-column
    database.ref().on("child_added", function (childSnapshot) {

        
        //calculate when next bus will come based off the start time and the current time


        //Current Time - push to DOM

        var tFrequency = childSnapshot.val().timing;

        // Time is 3:30 AM
        var firstTime = "03:30";

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment().format('HH:mm');

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        
        //creating a new table row 
        var newTrainDb = $("<tr>").addClass("train-row");

        //inputting each variable from db into it's related html field
        var colTrainNameDb = $("<td>").text(childSnapshot.val().trainName);
        var colDestinationLocDb = $("<td>").text(childSnapshot.val().destination);
        var colFrequencyDb = $("<td>").text(childSnapshot.val().timing);
        var colNextArrivalDb = $("<td>").text(moment(nextTrain).format("HH:mm"));
        var colMinutesAway = $("<td>").text(tMinutesTillTrain);
    
        $('#currentMilitaryTime').text(currentTime);
        
        //entering each variable into the DOM
        $('#table-body').append(
            newTrainDb).append(
                newTrainDb, 
                colTrainNameDb, 
                colDestinationLocDb, 
                colFrequencyDb, 
                colNextArrivalDb, 
                colMinutesAway);
    });
    
})