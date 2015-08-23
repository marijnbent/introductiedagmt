<?php

//Starts session so we can use the session variables.
session_start();

//Checking if you're already logged in. If you are, sends you back to the secured page.
if (isset($_SESSION['loggedIn'])) {
    header("Location: index.php");
    exit;
}

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
                            <li><a href="index.php">Kaart</a></li>
                            <li><a href="overview.php">Overzicht</a></li>
                            <li><a href="instructions.php">Instructies</a></li>
                            <li><a href="statistics.php">Statistieken</a></li>
                            <li class="active"><a href="info.php">Info</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="inner cover">
                <h4 class="page-title">Info</h4>

                <p class="lead">Bitches ain't shit but hoes and tricks.
                    Lick on these nuts and suck the dick.
                    Gets the fuck out after you're done.
                    And I hops in my ride to make a quick run.</p>
            </div>
            <!--<div class="mastfoot">-->
            <!--<div class="inner">-->
            <!--<p>TuneDrop 2015</p>-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/fileupload/lib/jquery.ui.widget.js"></script>
<script src="assets/fileupload/lib/jquery.iframe-transport.js"></script>
<script src="assets/fileupload/lib/jquery.fileupload.js"></script>
<script src="assets/fileupload/lib/jquery.cloudinary.js"></script>
<?php echo cloudinary_js_config(); ?>
<script src="assets/js/buildMap.js"></script>
<script src="assets/js/buildGrid.js"></script>
<script src="assets/js/customMap.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>