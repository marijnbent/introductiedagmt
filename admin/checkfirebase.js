init();

var pointGridIds = [];
var singlePointRef;

function init() {
//Setting up connection with Firebase
    var myDataRef = new Firebase('https://intro1d.firebaseio.com/');
    var pointRef = myDataRef.child("points");

    pointRef.on("value", function (snapshot) {
        //All points from firebase
        fireData = snapshot.val();
        fireData2 = snapshot.val();
        console.log(fireData);

        $.each(fireData, function (i, contents) {
            if (contents.active == 1) {
                $.each(fireData2, function (i2, contents2) {
                    if (contents2.active == 1) {
                        if (contents.gridId == contents2.gridId && i != i2) {
                            console.log('Dubbele marker.');
                            console.log(contents);
                            console.log(contents2);
                            if (i.timestamp > i2.timestamp) {
                                singlePointRef = pointRef.child(i);
                                //And push it to the Firebase
                                singlePointRef.update({active: 0});
                            } else {
                                singlePointRef = pointRef.child(i2);
                                //And push it to the Firebase
                                singlePointRef.update({active: 0});
                            }

                        }
                    }
                });
            }
        });

    });


}
