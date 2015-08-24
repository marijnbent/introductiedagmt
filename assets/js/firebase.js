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

        //Delete old markers
        for (var ii = 0; ii < markers.length; ii++) {
            markers[ii].setMap(null);
        }

        $.each(fireData, function (nameOfObject, objectData) {
            if (objectData.active == 1) {
                var latlng = new google.maps.LatLng(objectData.lat, objectData.lng);
                addMarker(latlng, objectData.teamId, objectData.photo);
                addColorToGrid(objectData.gridId, objectData.teamId)
            }
            //if (objectData.gridId == currentGrid) {
            //    console.log('Nog een keer naar getLocation');
            //    getLocation()
            //}
        });

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}

//Create marker with the known location

function addMarker(location, teamIdMarker,photo) {

    var teamIcon = teamIdIcon[teamIdMarker];

    var marker = new google.maps.Marker({
        position: location,
        icon: teamIcon,
        map: map,
        team: currentTeamId

    });

    // InfoWindow content
    var contentWindow =

        //Infowindow Container
        '<div id="iw-container">' +
            //Infowindow Title
        '<div class="iw-title">'+teamIdMarker+'</div>' +
            //Infowindow Content
        '<div class="iw-content">' +
            //Infowindow Text
        '<img src="'+ photo +'" >' +
            //Infowindow Footer
        '<div class="iw-footer">Klik op de kaart om dit venster te sluiten</div>' +
            //Infowindow Closing div
        '</div>';


    // Create new window and content
    var infowindow = new google.maps.InfoWindow({
        content: contentWindow,
        maxWidth: 300
    });

    // EventListener on click for the marker
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
        map.setCenter(marker.getPosition());
    });

    // EventListener to close the window when you click/tap on the map canvas
    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });

    google.maps.event.addListener(infowindow, 'domready', function () {

        // Reference to the DIV that wraps the bottom of infowindow
        var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
         */
        var windowBackground = iwOuter.prev();

        // Removes background shadow DIV
        windowBackground.children(':nth-child(2)').css({'display': 'none'});

        // Removes white background DIV
        windowBackground.children(':nth-child(4)').css({'display': 'none'});

        // Moves the infowindow 26px to the right.
        iwOuter.parent().parent().css({left: '26px'});

        // Moves the arrow 140px to the left margin.
        windowBackground.children(':nth-child(3)').attr('style', function (i, s) {
            return s + 'left: 140px !important;'
        });

        // Changes the desired tail shadow color.
        windowBackground.children(':nth-child(3)').find('div').children().css({
            'box-shadow': 'rgba(8, 8, 8, 1) 0px 1px 1px',
            'z-index': '1'

        });

        // Reference to the div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();
        // Apply the desired effect to the close button
        iwCloseBtn.css({
            display: 'none'
        });

        markers.push(marker);
    });
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
