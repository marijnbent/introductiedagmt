var myDataRef = new Firebase('https://tunedrop.firebaseio.com/');
var eventRef = myDataRef.child("eventlog");

$("table").stupidtable();


console.log('bestand geladen');
eventRef.on("value", function (snapshot) {
    //All points from firebase
    var eventObject = snapshot.val();
    eventHandler(eventObject);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

function eventHandler(eventObject) {
    $.each(eventObject, function (i, objectData) {

        console.log(objectData);
        $("#eventTable").append($('<tr>')
            .append($('<td>')
                .text(objectData.timestamp))
            .append($('<td>')
                .text(objectData.event))
            .append($('<td>')
                .text(objectData.teamId))
            .append($('<td>')
                .text(objectData.previousOwner)))

    });
}