// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCbVmNcBb2VMx1EDyia1FvcMM4M4iZPPvE",
    authDomain: "magic-train-schedule.firebaseapp.com",
    databaseURL: "https://magic-train-schedule.firebaseio.com",
    storageBucket: "magic-train-schedule.appspot.com",
    messagingSenderId: "1046040954851"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// on click event for train button 
$("#addTrainBtn").on("click", function(){

// get info 
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var muggles = $("#muggleInput").val().trim();
	var firstTrainMoment = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

// temp object to hold train data
	var newTrain = {
		name: trainName,
		destination: destination,
		muggles: muggles,
		firstTrain: firstTrainMoment,
		frequency: frequency
	}
// talk to firebase
	database.ref().push(newTrain);

// ohhhhhhhhhhh gotta clear forms.  that helps.  
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#muggleInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

// next train arrival based on current time ?? this seems to work,  it's magic! 
	return false;
});

// some firebase magic there are children. and childsnapshots and idk 
database.ref().on("child_added", function(childSnapshot, prevChildKey){

// some more variables yo 
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tmuggles = childSnapshot.val().muggles;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;

// some mathing does some math moment mathy stuff go go google powers  
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

// moment magic for arrival time 
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 

// magic trains magically appear on magic table 
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tmuggles + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});
