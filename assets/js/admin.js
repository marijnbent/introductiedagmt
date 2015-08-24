function buildMap() {

    var center = new google.maps.LatLng(51.924507, 4.477739);
    var minZoomLevel = 1;
    var maxZoomLevel = 16;

    function mapInit() {
        var mapOptions = {
            center: center,
            zoom: 12,
            minZoom: minZoomLevel,
            maxZoom: maxZoomLevel,
            mapTypeId: "customMapStyle",
            disableDefaultUI: true
        };

        // Custom map overlay settings (customMap.js) and applies settings to the map.
        var styledMap = new google.maps.StyledMapType(mapStyle, {name: "Styled Map"});
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        map.mapTypes.set('customMapStyle', styledMap);

        var walkingCoordinatesArray = [
            {lat: 51.902479, lng: 4.468173},
            {lat: 51.916431, lng: 4.502548},
            {lat: 51.923959, lng: 4.470997},
            {lat: 51.936044, lng: 4.505497}
        ];

        var walkingPath = new google.maps.Polyline({
            path: walkingCoordinatesArray,
            geodesic: true,
            strokeColor: '#FAB313',
            strokeOpacity: 1,
            strokeWeight: 2
        });


        // Multiple Markers
        var markers = [
            ['Point 1', 51.902479, 4.468173],
            ['Point 2', 51.916431, 4.502548],
            ['Point 3', 51.923959, 4.470997],
            ['Point 4', 51.936044, 4.505497]
        ];

        // Info Window Content
        var infoWindowContent = [
            ['<div>' + '<h1>Point 1</h1>' + '</div>'],
            ['<div>' + '<h1>Point 2</h1>' + '</div>'],
            ['<div>' + '<h1>Point 3</h1>' + '</div>'],
            ['<div>' + '<h1>Point 4</h1>' + '</div>']
        ];

        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;

        // Loop through our array of markers & place each one on the map
        for (i = 0; i < markers.length; i++) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0],
                icon: "assets/img/icon/teamYellowIcon.png"
            });

            // Allow each marker to have an info window
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));
        }

        walkingPath.setMap(map);
    }

    //After building the map, get the grid and build it.
    getGrid();
    google.maps.event.addDomListener(window, 'load', mapInit);
}


//var eventOptions = [
//    Events = ['Team Yellow took over sector 235',
//        'Team Yellow took over sector 235',
//        'Team Blue lost sector 125']
//];
//
//function createEventLog(array) {
//
//    var list = document.getElementById('eventLog');
//
//
//    for (var i = 0; i < array.length; i++) {
//
//        var item = document.createElement('li');
//        item.classList.add("list-group-item");
//
//        item.appendChild(document.createTextNode(array[i]));
//
//        list.appendChild(item);
//    }
//
//    return list;
//}
//document.getElementById('eventLog').appendChild(createEventLog(eventOptions[0]));


$('#addEvent').click(function () {
    var text = $('#inputEvent').val() + '<button>x</button>';
    if (text.length) {
        $('<li />', {html: text}).addClass("list-group-item").appendTo('#eventLog');
    }
    if ($('ul > li').length > 16) {
        $('ul li:eq(1)').remove();
    }
});

$('ul').on('click', 'button', function () {
    $(this).parent().remove()
});
