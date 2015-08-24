function buildMap() {

//Map variables

    var minZoomLevel = 1;
    var maxZoomLevel = 16;
    var center = new google.maps.LatLng(51.924507, 4.477739);
    var testMarker = new google.maps.LatLng(51.924507, 4.477739);
    var icon = "assets/img/icon/teamRedIcon.png";

//Init function

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

        // Resets zoom to minZoomlevel
        google.maps.event.addListener(map, 'zoom_changed', function () {
            if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
        });

        // Bounds for Rotterdam playarea
//        var strictBounds = new google.maps.LatLngBounds(
//            new google.maps.LatLng(51.880173, 4.412449),
//            new google.maps.LatLng(51.940173, 4.508449)
//        );

        // Listen for the drag event
//        google.maps.event.addListener(map, 'drag', function () {
//            if (strictBounds.contains(map.getCenter())) return;
//
//            // We're out of bounds - Move the map back within the bounds
//            var c = map.getCenter(),
//                x = c.lng(),
//                y = c.lat(),
//                maxX = strictBounds.getNorthEast().lng(),
//                maxY = strictBounds.getNorthEast().lat(),
//                minX = strictBounds.getSouthWest().lng(),
//                minY = strictBounds.getSouthWest().lat();
//            if (x < minX) x = minX;
//            if (x > maxX) x = maxX;
//            if (y < minY) y = minY;
//            if (y > maxY) y = maxY;
//            map.setCenter(new google.maps.LatLng(y, x));
//        });

        // InfoWindow content
        var contentWindow =

            //Infowindow Container
            '<div id="iw-container">' +
                //Infowindow Title
                '<div class="iw-title">Rotterdam Hofplein</div>' +
                //Infowindow Content
                '<div class="iw-content">' +
                //Infowindow Sub-Title
                '<div class="iw-subTitle">Informatie</div>' +
                //Infowindow Text
                '<p>Station Hofplein was het Rotterdamse eindpunt van de Hofpleinlijn, de voormalige ZHESM lijn tussen Rotterdam en Scheveningen.</p>' +
                //Infowindow Footer
                '<div class="iw-footer">Klik op de kaart om dit venster te sluiten</div>' +
                //Infowindow Closing div
                '</div>';

        // Create new window and content
        var infowindow = new google.maps.InfoWindow({
            content: contentWindow,
            maxWidth: 300
        });

        // Test Marker
        var marker = new google.maps.Marker({
            position: testMarker,
            map: map,
            title: "Rotterdam Hofplein",
            team: 2,
            sector: 214,
            icon: icon
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
        });

        //After building the map, get the grid and build it.

        getGrid();
        addFixedMarkers();


    }

    google.maps.event.addDomListener(window, 'load', mapInit);

}