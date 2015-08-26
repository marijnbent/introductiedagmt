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
							<li class="active text-uppercase"><a href="instructions.php">Instructies</a></li>
							<li><a class="text-uppercase" href="overview.php">Scores</a></li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="inner cover">
				<h4 class="page-title">Instructies</h4>

			</div>
			<p>Rotterdam is verdeeld in een grid met sectoren.
				Elke sector kan overgenomen worden</p>

			<p class="lead">LEGE SECTOR OVERNEMEN</p>

			<p>
				Als je een sector wilt overnemen moet je een punt plaatsen. Bij dit punt neem je een selfie met het hele
				team. Je kan een sector alleen overnemen als deze boven, onder, links en/of rechts zit aangesloten bij
				een andere sector van jouw team.</p>

			<p class="lead">VIJANDELIJKE SECTOR VERWIJDEREN</p>

			<p>
				Als je in een vijandelijke sector zit, kun je deze verwijderen. De sector wordt neutraal, waarna je deze
				kan overnemen (mits deze zit verbonden met één van je andere sectoren.</p>


			<p class="lead">SPECIALE SECTOREN</p><p>
			De sectoren met een grijze point of intrest geven intressante plekken aan in de stad. Door deze over te nemen kun je extra punten verdienen. Deze sectoren zijn 5 punten waard in plaats van 1!
			</p>
			<p class="lead">PUNTENTELLING</p><p>
			Elke 15 minuten worden de punten van alle teams bij elkaar opgeteld. Op de overzicht pagina kunnen jullie bijhouden hoeveel punten elk team heeft.
</p>

			<p class="lead">TIPS</p><p>
				- Herlaad als er iets mis gaat.<br/>

			- Als je een foto hebt geselecteerd, wacht geduldig tot deze geüpload is.<br/>

			- Bekijk ook de andere pagina’s, INSTRUCTIES en SCORES.<br/>

			- ADVIES: Android in combinatie met Google Chrome<br/>

			- HULPLIJN: bel of whatsapp als er iets mis gaat of als je vragen hebt.<br/>

			- Hulpnummer : 06-147 474 54<br/>

			- Ga gerust met de tram.<br/>

			</p>
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
</body>
</html>