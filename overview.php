<?php

//Starts session so we can use the session variables.
session_start();

require_once 'assets/php/config.php';
require_once 'assets/php/db.php';

//Checking if you're already logged in. If you are, sends you back to the secured page.
if (!isset($_SESSION['loggedIn'])) {
    header("Location: index.php");
    exit;
}

$select = "SELECT * FROM ". $score_table ."";

//Send query to the function mySqlConnection with the query, config settings and dbconnection.
$result = queryToDatabase($dbLink, $select);
$points = queryToArray($result);

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

                <p class="lead">Hier staat het puntenoverzicht van de verschillende teams per kleur.</p>
                <table class="table text-center">
                    <tr>
                        <th class="text-center">Teamkleur:</th>
                        <th class="text-center">Teamscore:</th>
                    </tr>
                    <tr>
                        <td>Rood</td>
                        <td><?= $points[0]['red'] ?></td>
                    </tr>
                    <tr>
                        <td>Blauw</td>
                        <td><?= $points[0]['blue'] ?></td>
                    </tr>
                    <tr>
                        <td>Groen</td>
                        <td><?= $points[0]['green'] ?></td>
                    </tr>
                    <tr>
                        <td>Paars</td>
                        <td><?= $points[0]['purple'] ?></td>
                    </tr>
                    <tr>
                        <td>Cyaan</td>
                        <td><?= $points[0]['cyan'] ?></td>
                    </tr>
                    <tr>
                        <td>Geel</td>
                        <td><?= $points[0]['yellow'] ?></td>
                    </tr>

                </table>
            </div>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
</body>
</html>