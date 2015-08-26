
<?php
session_start();
if (!isset($_SESSION['loggedIn'])) {
    header("Location: login.php");
    exit;
}
require 'assets/fileupload/main.php';
?>
<html lang="en">
<head>
    <?php require_once('assets/php/head.php'); ?>
    <link href="assets/css/admin.css" rel="stylesheet">

</head>
<body>

<div class="site-wrapper">



    <div class="site-wrapper-inner">

        <input type="test" id="inputEvent" maxlength="50"/>
        <button id="addEvent">Click me!</button>

        <ul class="justList"></ul>

        <ul id="eventLog" class="list-group">
            <li class="list-group-item active">Event Log</li>
        </ul>
        <div id="teambuttons" class="btn-group" role="group" aria-label="...">
            <h2>Toggle teams</h2>
                <button type="button" class="btn btn-default teamGreenButton">Team</button>
                <button type="button" class="btn btn-default teamBlueButton">Team</button>
                <button type="button" class="btn btn-default teamYellowButton">Team</button>
                <button type="button" class="btn btn-default teamRedButton">Team</button>
                <button type="button" class="btn btn-default teamPurpleButton">Team</button>
        </div>
        <div class="cover-container">



            <div class="masthead clearfix">
            </div>
            <h4 class="page-title">Admin page</h4>

            <p class="lead">Hieronder staan alle points en paths</p>

            <!--            <p>Jij bent team '--><? //= $_SESSION['teamName']; ?><!--', met het id '-->
            <? //= $_SESSION['teamId']; ?><!--'. Jullie naam-->
            <!--                is-->
            <!--                '--><? //= $_SESSION['teamSelfChosenTeamName']; ?><!--'. Jullie foto is <a-->
            <!--                    href="--><? //= $_SESSION['teamPhoto']; ?><!--">hier</a> te vinden.</p>-->


            <div id="map-canvas"></div>
            <div id="interaction-section"></div>
            <!--            <div id="modal-point-placer" class="modal fade">-->
            <!--                <div class="modal-dialog">-->
            <!--                    <div class="modal-content" style="color: #000000 !important">-->
            <!--                        <div class="modal-header">-->
            <!--                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span-->
            <!--                                    aria-hidden="true">&times;</span></button>-->
            <!--                            <h4 class="modal-title">Voeg een punt toe</h4>-->
            <!--                        </div>-->
            <!--                        <div class="modal-body">-->
            <!--                            <p>Awesome dat je ons spel speelt!</p>-->
            <!---->
            <!--                            <p>Voor dit punt moeten wij natuurlijk wel een leuke teamfoto ontvangen. Maak er een en-->
            <!--                                plaats de punt!</p>-->
            <!---->
            <!--                            <div id='direct_upload'>-->
            <!--                                <h1>Marijn is een lekkere vent. Jasper ook. Jeremy heeft een mooie baard.</h1>-->
            <!---->
            <!--                                <form>-->
            <!--                                    --><?php
            //                                    # The callback URL is set to point to an HTML file on the local server which works-around restrictions
            //                                    # in older browsers (e.g., IE) which don't full support CORS.
            //                                    echo cl_image_upload_tag('test', array("tags" => "direct_photo_album", "callback" => $cors_location, "html" => array("multiple" => true)));
            //                                    ?>
            <!--                                </form>-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!--                        <!-- /.modal-content -->-->
            <!--                    </div>-->
            <!--                    <!-- /.modal-dialog -->-->
            <!--                </div>-->
            <!--                <!-- /.modal -->-->
            <!---->
            <!--            </div>-->
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

    <!-- Do we need this file? -->
    <script src="assets/js/admin.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
    <script src='assets/fileupload/js/jquery.ui.widget.js' type='text/javascript'></script>
    <script src='assets/fileupload/js/jquery.iframe-transport.js' type='text/javascript'></script>
    <script src='assets/fileupload/js/jquery.fileupload.js' type='text/javascript'></script>
    <script src='assets/fileupload/js/jquery.cloudinary.js' type='text/javascript'></script>
    <script src="assets/js/firebase.js"></script>
    <script src="assets/js/buildGrid.js"></script>
    <script src="assets/js/customMap.js"></script>
    <script src="assets/js/getLocation.js"></script>
    <script src="assets/js/interactionHandler.js"></script>
    <script src="assets/js/main.js"></script>

</body>
</html>