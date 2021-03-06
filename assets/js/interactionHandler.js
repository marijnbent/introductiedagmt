function squareInteractionEmpty() {

    //Check all directions
    var Xmin = currentGrid.x - 1;
    var Ymin = currentGrid.y - 1;
    var Xplus = currentGrid.x + 1;
    var Yplus = currentGrid.y + 1;
    var connectedSquare = false;
    for (var i = 1; i < gridArray.length - 1; i++) {
        if ((gridArray[i].y == currentGrid.y && (gridArray[i].x == Xmin || gridArray[i].x == Xplus)) ||
            (gridArray[i].x == currentGrid.x && (gridArray[i].y == Ymin || gridArray[i].y == Yplus))) {
            if (gridArray[i].teamId == currentTeamId) {
                connectedSquare = true;
                break;
            } else {
            }
        }
    }
    connectedSquaresHandler(connectedSquare);
}

function connectedSquaresHandler(connectedSquare) {
    if (connectedSquare == true) {
        $(".cover-container").css("background-color", "#005200");
        $("#interaction-section")
            .empty()
            .append($("<h3>")
                .text("Deze sector is aangesloten aan je netwerk. Neem nu over."))
            .append($('<button>')
                .attr('class', 'btn btn-lg btn-warning interaction-button')
                .attr('id', 'newpoint')
                .text('Take-over')
            );
        $("#newpoint").on('click', placePointHandler)
    }
    else {
        $("#interaction-section")
            .empty()
            .append($("<h3>")
                .text("Deze sector is niet aangesloten aan je netwerk.")
            );
    }
}

function squareInteractionFriendly() {

    $("#interaction-section")
        .empty()
        .append($("<h3>")
            .text("Deze sector hoort bij jouw netwerk. Ga snel naar een andere sector om deze aan je netwerk toe te voegen."))
}

function squareInteractionEnemy() {
    $(".cover-container").css("background-color", "#660000");
    $("#interaction-section")
        .empty()
        .append($("<h3>")
            .text("Deze sector is van een vijandelijk team. Wil je dit punt verwijderen?"))
        .append($('<button>')
            .attr('class', 'btn btn-lg btn-warning interaction-button')
            .attr('id', 'removepoint')
            .text('Remove this point')
        );


    $("#removepoint").on('click', removePointHandler)
}



function squareInteractionProtected() {
    $("#interaction-section")
        .empty()
        .append($("<h3>")
            .text("Deze sector is de startlocatie van een team, en kan daardoor niet worden overgenomen. Ga snel naar een ander punt en neem deze over!"))
}

function placePointHandler() {
    $("#modal-point-placer").modal('show');

    $(function () {
        $('.cloudinary-fileupload')
            .fileupload({
            })
            .on('cloudinarydone', function (e, data) {
                $("#modal-point-placer").modal('hide');
                $('#uploading-photo').empty();
                var info = $('<div class="uploaded_info"/>');
                $(info).append($('<div class="data"/>').append(prettydump(data.result)));
            });
    });

    function prettydump(obj) {

        var lat = currentPosition.G;
        var lng = currentPosition.K;
        var teamId = currentTeamId;
        var photo = obj.url;
        var gridId = currentGrid.id;
        var timestamp = new Date() / 1000;
        var eventTimestamp = new Date();
        eventTimestamp = eventTimestamp.getTime();
        var currentGridTeamId = currentGrid.teamId;
        var eventDescription = "Point captured";
        console.log('EVENT TIMESTAMP');
        console.log(eventTimestamp);

        //Create new objects with gridId as key, so it's dynamic
        var markerInfo = {};
        markerInfo = {active: 1, teamId: teamId, photo: photo, lat: lat, lng: lng, gridId: gridId, timestamp: timestamp};

        //And push it to the Firebase
        pointRef.push(markerInfo);

        var changeGridId = gridId;
        var gridRef = gridsRef.child(changeGridId);

        //And push it to the Firebase
        gridRef.update({teamId: teamId});

        var eventInfo = {};

        eventInfo[eventTimestamp] = {teamId: teamId, gridId: gridId, previousOwner: currentGridTeamId, timestamp: eventTimestamp, event: eventDescription};
        console.log(eventInfo);

        eventRef.update(eventInfo);


        //https://www.firebase.com/docs/web/api/firebase/push.html

    }

    //MAKE PHOTO

    //SEND TO FIREBASE

    //CHANGE BACKGROUND

    //SEND TO DATABASE

    //RELOADS(PARTIALLY) PAGE
}


function removePointHandler() {
    $.each(fireData, function (nameOfObject, objectData) {
        if (objectData.gridId == currentGrid.id && objectData.active == 1) {

            var singlePointRef = pointRef.child(nameOfObject);

            //And push it to the Firebase
            singlePointRef.update({active: 0});

            var changeGridId = objectData.gridId;

            var gridRef = gridsRef.child(changeGridId);

            //And push it to the Firebase
            gridRef.update({teamId: 1});

            //DATA FOR EVENTLOG

            var eventTimestamp = new Date();
            eventTimestamp = eventTimestamp.getTime();
            var gridId = currentGrid.id;
            var teamId = currentTeamId;
            var currentGridTeamId = currentGrid.teamId;
            var eventDescription = "Point removed";

            var eventInfo = {};

            eventInfo[eventTimestamp] = {teamId: teamId, gridId: gridId, previousOwner: currentGridTeamId, timestamp: eventTimestamp, event: eventDescription};

            eventRef.update(eventInfo);

            addColorToGrid(objectData.gridId, 1);

        }
    });
}
