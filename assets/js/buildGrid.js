/**
 * This function builds the game grid after getting a callback from the AJAX call (function getGrid())
 */

function getGridHandler(gridData) {
    var rectangle;

    for (var i = 1; i < gridArray.length; i++) {
        gridArray[i].setMap(null);
    }

    gridArray.length = 0;
    console.log(gridArray);
    gridArray[0]= {};
    $.each(gridData, function (i, squareData) {
        if (squareData != undefined){
        rectangle = new google.maps.Rectangle({
            strokeOpacity: 1,
            strokeWeight: 0.2,
            strokeColor: '#000000',
            id: squareData.id,
            latStart: squareData.latStart,
            latEnd: squareData.latEnd,
            lngStart: squareData.lngStart,
            lngEnd: squareData.lngEnd,
            x: squareData.X,
            y: squareData.Y,
            teamId: squareData.teamId,
            fillColor: '#FFFFFF',
            fillOpacity: 0.30,
            map: map,
            bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(squareData.latStart, squareData.lngStart),
                new google.maps.LatLng(squareData.latEnd, squareData.lngEnd))
        });
        gridArray.push(rectangle);
        google.maps.event.addListener(rectangle, 'click', function () {
            infowindow.close();
            console.log(this.y + "Y, " + this.x + "X, " + this.id + " ID.");
        });
        }
    });

    //Lets create the firebase connection and display the markers
    firebaseInit();
    getLocation();
}

