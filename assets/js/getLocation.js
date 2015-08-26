/**
 * getLocation uses the Google maps API establish your current location in the form of a marker, then uses that marker in the function getCurrentGrid
 */

function getLocation() {

    navigator.geolocation.getCurrentPosition(function (position) {

        //Beated the system!
        currentPosition = new google.maps.LatLng(51.918831, 4.486649);
        //currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        for (var i = 0; i < playerMarker.length - 1; i++ ) {
            playerMarker[i].setMap(null);
        }
        var marker = new google.maps.Marker({
            position: currentPosition,
            icon: teamIdIcon['person'],
            map: map
        });
        playerMarker = [];
        playerMarker.push(marker);

        setTimeout(getLocation, 10000);
        getCurrentGrid(marker)
    });
}

/**
 * Loops through all the entries in the grid array, checks if the current marker is within the bounds, and if so, uses the id of that square to check who controls the square.
 * If a match can be found, currentGridTeamIdAjax() will commence.
 * @param marker
 */

function getCurrentGrid(marker) {
    //G = Latitude, K = Longitude
    //WARNING: Google Maps API changes these up quite often, be sure to check!
    var currentLat = marker.position.G;
    var currentLng = marker.position.K;
    for (var i = 0; i < gridArray.length; i++) {
        //TODO: What happend here?
        if (currentLat > gridArray[i].latStart && currentLat < gridArray[i].latEnd && currentLng > gridArray[i].lngStart && currentLng < gridArray[i].lngEnd) {
            currentGrid.id = gridArray[i].id;
            currentGrid.x = gridArray[i].x;
            currentGrid.y = gridArray[i].y;
            currentGrid.teamId = gridArray[i].teamId;
            currentSquareTeamChecker();
            break;
        } else if (i == gridArray.length - 1) {
            $("#interaction-section")
                .empty()
                .append($('<tr>')
                    .html('Please enter the grid')
                )
        }
    }
}

/**
 * Checks to which team the square belongs (1 = neutral) *
 */

function currentSquareTeamChecker() {
console.log(currentGrid);
    console.log(currentGrid.teamId);
    if (currentGrid.teamId == 1) {
        squareInteractionEmpty();
    } else if (currentGrid.teamId == currentTeamId) {
        squareInteractionFriendly();
    } else if (currentGrid.teamId != currentTeamId) {
        squareInteractionEnemy();
    } else {
        console.log('fubar');
    }
}
