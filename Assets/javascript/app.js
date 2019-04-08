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


        //creating a new table row 
        var newTrainDb = $("<tr>").addClass("train-row");

        //inputting each variable from db into it's related html field
        var colTrainNameDb = $("<td>").text(childSnapshot.val().trainName);
        var colDestinationLocDb = $("<td>").text(childSnapshot.val().destination);
        var colFrequencyDb = $("<td>").text(childSnapshot.val().timing);
        var colNextArrivalDb = $("<td>").text();
        var colMinutesAway = $("<td>").text();

        //calculate when next bus will come based off the start time and the current time
        
        var freq;
        console.log(colFrequencyDb);
        
        //CURRENT TIME
        var currentTime = moment();
        //FIRST TIME: PUSHED BACK ONE YEAR TO COME BEFORE CURRENT TIME
        // var dConverted = moment(time,'hh:mm').subtract(1, 'years');
        var convertedDay = moment(childSnapshot.val().colFrequencyDb, 'HH:mm').subtract(1, 'years');
        var trainTime = moment(convertedDay).format('HH:mm');
        
        //
        var convertedTime = moment(trainTime, 'HH:mm').subtract(1, 'years');
        var timeDifference = moment().diff(moment(convertedTime), 'minutes');
        //
        var timeRemaining = timeDifference % freq;
        //
        var minsAway = freq - timeRemaining;
        //
        var nextTrain = moment().add(minsAway, 'minutes');

    

        

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