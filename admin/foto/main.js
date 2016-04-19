init();

var fireData;

function init() {
//Setting up connection with Firebase
    var myDataRef = new Firebase('https://intro1d.firebaseio.com/');
    var pointRef = myDataRef.child("points");

    pointRef.on("value", function (snapshot) {
        //All points from firebase
        fireData = snapshot.val();
        console.log(fireData);

        $.each(fireData, function (i, contents) {
            console.log(contents.photo);
            $("#foto").append('<img src="' + contents.photo + '">');
        });
    });
}