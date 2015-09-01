var myDataRef = new Firebase('https://intro1a.firebaseio.com/');
var eventRef = myDataRef.child("eventlog");
var eventObject;


eventRef.on("value", function (snapshot) {
    //All points from firebase
    eventObject = snapshot.val();
    eventHandler(eventObject);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

function eventHandler(eventObject){
    $.each(eventObject, function (i, objectData) {

    });
}