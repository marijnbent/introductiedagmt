init();

var pointGridIds = [];

function init() {
//Setting up connection with Firebase
    var myDataRef = new Firebase('https://tunedrop.firebaseio.com/');
    var pointRef = myDataRef.child("points");

    pointRef.on("value", function (snapshot) {
        //All points from firebase
        fireData = snapshot.val();
        console.log(fireData);

        $.each(fireData, function(i, contents) {
            if (contents.active == 1) {
                pointGridIds[i] = contents.gridId;

            }
        });

        console.log(pointGridIds);


    });


}