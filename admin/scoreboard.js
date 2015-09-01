
//Setting up connection with Firebase
var myDataRef = new Firebase('https://tunedrop.firebaseio.com/');
var gridsRef = myDataRef.child("grids");


var scoreRed = 0, scoreBlue = 0, scoreCyan = 0, scorePurple = 0, scoreYellow = 0, scoreGreen = 0;
var currentTime;
var currentHour;
var currentMinutes;
var checkTimes = ['13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30'];
var currentCheckTime;

var fireData;

init();

function init() {
    checkScores();
    checkTime();
}
function checkTime () {
    setTimeout(checkTime, 60000);
    currentTime = new Date();

    console.log('Herlaad de pagina als dit niet tussen de 1-10 ligt. ' + currentTime.getSeconds());

    currentHour = currentTime.getHours();
    currentMinutes = currentTime.getMinutes();

    currentCheckTime = currentHour + ':' + currentMinutes;
    console.log(currentCheckTime);


    //Loop through array
    for (var i = 0; i < checkTimes.length; i++) {
        if (checkTimes[i] == currentCheckTime) {
            writeToDatabase();
        }
    }

    $('#currentTime').empty().append('<p>Tijd: ' + currentCheckTime + '</p>');

}

function writeToDatabase () {
    $.ajax({
        method: "POST",
        url: "scoreboard.php",
        data: {red: scoreRed, blue: scoreBlue, cyan: scoreCyan, purple: scorePurple, yellow: scoreYellow, green: scoreGreen, timestamp: currentCheckTime}
    })
}

function checkScores () {
    gridsRef.on("value", function (snapshot) {
        fireData = snapshot.val();
        scoreRed = 0;
        scoreBlue = 0;
        scoreCyan = 0;
        scorePurple = 0;
        scoreYellow = 0;
        scoreGreen = 0;

        $.each(fireData, function (i, contents) {
            if (i != 0) {
                if (contents.teamId != 1) {

                    if (contents.teamId == 2) {
                        scoreRed = scoreRed + contents.value;
                    } else if (contents.teamId == 3) {
                       scoreBlue = scoreBlue + contents.value;
                    } else if (contents.teamId == 4) {
                        scorePurple = scorePurple + contents.value;
                    } else if (contents.teamId == 5) {
                       scoreGreen = scoreGreen + contents.value;
                    } else if (contents.teamId == 10) {
                        scoreYellow = scoreYellow + contents.value;
                    } else if (contents.teamId == 35) {
                       scoreCyan = scoreCyan + contents.value;
                    }
                }
            }

        });

        $('#scoreRed').empty().append('<p>Red: ' + scoreRed + '</p>');
        $('#scoreBlue').empty().append('<p>Blue: ' + scoreBlue + '</p>');
        $('#scorePurple').empty().append('<p>Purple: ' + scorePurple + '</p>');
        $('#scoreGreen').empty().append('<p>Green: ' + scoreGreen + '</p>');
        $('#scoreYellow').empty().append('<p>Yellow: ' + scoreYellow + '</p>');
        $('#scoreCyan').empty().append('<p>Cyan: ' + scoreCyan + '</p>');

    });
}