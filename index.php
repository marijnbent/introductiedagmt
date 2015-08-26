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
</head>
<body>

<div class="site-wrapper">
    <div class="site-wrapper-inner">
        <div class="cover-container">
            <div class="masthead clearfix">
                <div class="inner-navbar">
                    <h2 class="masthead-brand">TuneDrop</h2>
                    <nav>
                        <ul class="nav masthead-nav ">
                            <li class="active"><a href="index.php">Kaart</a></li>
                            <li><a href="overview.php">Overzicht</a></li>
                            <li><a href="instructions.php">Instructies</a></li>
                            <li><a href="statistics.php">Statistieken</a></li>
                            <li><a href="info.php">Info</a></li>
                            <li><a href="uploadtest.php">Dat Upload</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="inner cover">
                <h4 class="page-title">Kaart</h4>

                <p class="lead">Dit is de home pagina waar de game wordt gespeeld</p>

                <p>Jij bent team '<?= $_SESSION['teamName']; ?>', met het id '<?= $_SESSION['teamId']; ?>'. Jullie naam
                    is '<?= $_SESSION['teamSelfChosenTeamName']; ?>'.</p>

                <div id="map-canvas"></div>
                <div id="interaction-section"></div>
                <div id="modal-point-placer" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content" style="color: #000000 !important">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Voeg een punt toe</h4>
                            </div>
                            <div class="modal-body">

                                <div id='direct_upload'>
                                    <p>Na het kiezen van een foto kan het even duren voordat deze is geüpload.
                                            Even geduld alsjeblieft.</p>

                                    <form>
                                        <p><strong>Maak een teamfoto:</strong></p>
                                        <?php
                                        # The callback URL is set to point to an HTML file on the local server which works-around restrictions
                                        # in older browsers (e.g., IE) which don't full support CORS.
                                        echo cl_image_upload_tag('test', array("tags" => "direct_photo_album", "callback" => $cors_location, "html" => array("multiple" => true)));
                                        ?>
                                    </form>
                                    <div id="uploading-photo"></div>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->

                </div>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js"></script>

    <!-- Do we need this file? -->
    <script src="assets/js/bootstrap.min.js"></script>
    <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
    <script src='assets/fileupload/js/jquery.ui.widget.js' type='text/javascript'></script>
    <script src='assets/fileupload/js/jquery.iframe-transport.js' type='text/javascript'></script>
    <script src='assets/fileupload/js/jquery.fileupload.js' type='text/javascript'></script>

    <script src='assets/fileupload/js/jquery.cloudinary.js' type='text/javascript'></script>
    <script src="assets/js/fixedMarkers.js"></script>
    <script src="assets/js/firebase.js"></script>
    <script src="assets/js/buildMap.js"></script>
    <script src="assets/js/buildGrid.js"></script>
    <script src="assets/js/customMap.js"></script>
    <script src="assets/js/getLocation.js"></script>
    <script src="assets/js/interactionHandler.js"></script>
    <script src="assets/js/main.js"></script>

</body>
</html>