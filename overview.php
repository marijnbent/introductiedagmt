<?php

//Starts session so we can use the session variables.
session_start();

//Checking if you're already logged in. If you are, sends you back to the secured page.
if (!isset($_SESSION['loggedIn'])) {
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
                    <h1 class="masthead-brand text-uppercase">Intro_game</h1>
                    <nav>
                        <ul class="nav masthead-nav">
                            <li><a class="text-uppercase" href="index.php">Kaart</a></li>
                            <li><a class="text-uppercase" href="instructions.php">Instructies</a></li>
                            <li class="active text-uppercase"><a href="overview.php">Scores</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="inner cover">
                <h4 class="page-title">Overzicht</h4>

                <p class="lead">Hier komt de overzicht kaart.</p>
            </div>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
</body>
</html>