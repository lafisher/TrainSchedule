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

// Grab user input
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var muggles = $("#muggleInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

// temporary object to hold train data
	var newTrain = {
		name:  trainName,
		destination: destination,
		muggles: muggles,
		firstTrain: firstTrainUnix,
		frequency: frequency
	}
// push train data to database
	database.ref().push(newTrain);

// console check 
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(firstTrainUnix);
	console.log(newTrain.frequency)

// Clear
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#muggleInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

// next train arrival based on current time 
	return false;
});

// some firebase magic there are children. and childsnapshots and idk but it seems to work
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

// variables yo 
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tmuggles = childSnapshot.val().muggles;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;

// some mathing does some math moment mathy stuff  
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

// moment magic for arrival time 
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	console.log(tMinutes);
	console.log(tArrival);

	console.log(moment().format("hh:mm A"));
	console.log(tArrival);
	console.log(moment().format("X"));

// magic trains magically appear on magic table 
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tmuggles + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});
