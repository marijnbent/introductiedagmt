/**
 * Config.js :-)
 */

var map;
var gridArray = [];
var currentGrid = {};
var currentTeamId = getCookie('teamId');
var currentTeamPhoto = getCookie('teamPhoto');
var currentTeamSelfChosenTeamName = getCookie('teamSelfChosenTeamName');
var currentPosition;
var fixedMarkerArray = [];
var infoWindow;

var teamIdColor = {
    2: "#A8111B", //red
    3: "#203066", //blue
    4: "#8E3975", //purple
    5: "#0D4748", //green
    10: "#FAB313", //yellow
    1: "#ffffff" //neutral
};

var teamIdIcon = {
    2: "assets/img/icon/teamRedIcon.png", //red
    3: "assets/img/icon/teamBlueIcon.png", //blue
    4: "assets/img/icon/teamPurpleIcon.png", //pink
    5: "assets/img/icon/teamGreenIcon.png", //green
    10: "assets/img/icon/teamYellowIcon.png", //yellow
    1: "assets/img/icon/marijnmarker.png", //neutral
    person: "assets/img/icon/nigga.png"
};

//Setting up connection with Firebase
var myDataRef = new Firebase('https://tunedrop.firebaseio.com/');
var pointRef = myDataRef.child("points");
var gridsRef = myDataRef.child("grids");

$.cloudinary.config({ cloud_name: 'tunedrop', api_key: '557355671575436'});

$(init);

/**
 * Initializes the application, builds the map, gets the grid
 */

function init(){
    buildMap();
}

//TODO: Why is this here?
function getGrid(){
    var gridsObject;

    gridsRef.on("value", function (snapshot) {
        //All points from firebase
        gridsObject = snapshot.val();
        getGridHandler(gridsObject);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}

/**
 *
 * Script from w3schools, read the value of a cookie.
 *
 * @param cname
 * @returns {string}
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

$('.cloudinary-fileupload').on('click', function () {
    $('#uploading-photo').append('<img id="theImg" src="https://globalgenes.org/user/loading.gif" />');
});

