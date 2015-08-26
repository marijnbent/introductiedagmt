var markers = [];
var fireData;

function firebaseInit() {

    //Save databaselocation for points
    requestMarkerLocations();
}

//Request all markerlocations from firebase
function requestMarkerLocations() {

    pointRef.on("value", function (snapshot) {
        //All points from firebase
        fireData = snapshot.val();
        console.log(fireData);
        console.log('markers.length');
        console.log(markers.length);

        //Delete old markers
        for (var i = 0; i < markers.length; i++) {
            console.log('markers leeg bitch');
            markers[i].setMap(null);
        }

        $.each(fireData, function (nameOfObject, objectData) {
            if (objectData.active == 1) {
                var latlng = new google.maps.LatLng(objectData.lat, objectData.lng);
                addMarker(latlng, objectData.teamId, objectData.photo);
                addColorToGrid(objectData.gridId, objectData.teamId)
            }
            if (objectData.gridId == currentGrid) {
                getLocation()
            }

        });

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}

//Create marker with the known location

function addMarker(location, teamIdMarker, photo) {

    var teamIcon = teamIdIcon[teamIdMarker];

    var marker = new google.maps.Marker({
        position: location,
        icon: teamIcon,
        map: map,
        team: currentTeamId
    });

    markers.push(marker);

}

//gridIdMarker = JUISTE GRID.
function addColorToGrid(gridIdMarker, teamIdMarker) {
    // Background color for gridId

    gridIdMarker = parseInt(gridIdMarker);
    var rectangle;
    //Get teamcolor from main.js for the holding team
    var teamColor = teamIdColor[teamIdMarker];

    //Delete rectangle which is about to be replaced with new color
    gridArray[gridIdMarker].setMap(null);

    //Create new rectangle with the appropriate background color
    rectangle = new google.maps.Rectangle({
        strokeOpacity: 1,
        strokeWeight: 0.2,
        strokeColor: '#000000',
        id: gridIdMarker,
        latStart: gridArray[gridIdMarker].latStart,
        latEnd: gridArray[gridIdMarker].latEnd,
        lngStart: gridArray[gridIdMarker].lngStart,
        lngEnd: gridArray[gridIdMarker].lngEnd,
        teamId: gridArray[gridIdMarker].teamId,
        x: gridArray[gridIdMarker].x,
        y: gridArray[gridIdMarker].y,
        fillColor: teamColor,
        fillOpacity: 0.5,
        map: map,
        bounds: new google.maps.LatLngBounds(
            //Starting coordinates (latStart, lngStart)
            new google.maps.LatLng(gridArray[gridIdMarker].latStart, gridArray[gridIdMarker].lngStart),
            //Ending coordinates (latEnd, lngEnd)
            new google.maps.LatLng(gridArray[gridIdMarker].latEnd, gridArray[gridIdMarker].lngEnd))
    });

    //Add new grid to array.
    gridArray[gridIdMarker] = rectangle;


}

function sendCurrentPosition(myDataRef) {
//Save databaselocation for points
    var currentPositionRef = myDataRef.child("currentPosition");
    var teamId = 1;
    var lat = 1;
    var lng = 1;
    var markerInfo = {};
    teamPosition[teamId] = {lat: lat, lng: lng};

//And push it to the Firebase
    currentPositionRef.update(teamPosition);
}

//Send data to firebase when form is submitted SHIT
//    $("#form").submit(function (event) {
//        event.preventDefault();
//
//        var lat = $('#lat').val();
//        var lng = $('#lng').val();
//        var teamId = $('#teamId').val();
//        var photo = $('#photo').val();
//        var gridId = $('#gridId').val();

//        //Create new objects with gridId as key, so it's dynamic
//        var markerInfo = {};
//        markerInfo[gridId] = {teamId: teamId, photo: photo, lat: lat, lng: lng, gridId: gridId};
//
//        //And push it to the Firebase
//        pointRef.update(markerInfo);
