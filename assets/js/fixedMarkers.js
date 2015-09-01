function addFixedMarkers() {
    for (var i = 0; i < fixedMarkerArray.length; i++) {
        fixedMarkerArray[i].setMap(null);
    }

    $.ajax({
        dataType: "json",
        url: 'assets/json/fixedMarkers.json',
        success: addFixedMarkersCallback
    });
}

function addFixedMarkersCallback(fixedMarkers) {

    $.each(fixedMarkers.data, function (i, fixedMarker) {
        placeFixedMarker(fixedMarker);
    });
}

function placeFixedMarker(fixedMarkerData) {
    var position = new google.maps.LatLng(fixedMarkerData.lat, fixedMarkerData.lng);
    var fixedMarker = new google.maps.Marker({
        position: position,
        map: map,
        icon: "assets/img/icon/infoMarker2.png"
    });

    fixedMarkerArray.push(fixedMarker);
}