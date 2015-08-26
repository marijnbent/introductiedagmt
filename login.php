<?php

//Starts session so we can use the session variables.
session_start();
//Include db.php file to use our code on multiple pages.
require_once 'assets/php/config.php';
require_once 'assets/php/db.php';
require_once 'assets/php/password-validation.php';

//Checking if you're already logged in. If you are, sends you back to the secured page.
if (isset($_SESSION['loggedIn'])) {
	header("Location: index.php");
	exit;
}

if (isset($_GET['registered'])) {
	$message = "U kunt nu inloggen met uw zojuist ingevulde gegevens.";
}

//If you've submitted the login form, this function will start to check your data.
if (isset($_POST['submit'])) {
	//Anti sql injection via the input field and put the values of the form to variables.
	$teamName = dataFilter($_POST['teamName'], $dbLink);
	//Create query to collect the email and password from database.
	$select = "SELECT * FROM teams
			   WHERE `name` = '" . $teamName . "'";
	//Send query to the function mySqlConnection with the query, config settings and dbconnection.
	$result = queryToDatabase($dbLink, $select);
	$user = queryToArray($result);

	if (!isset ($user[0]['password'])) {
		$warning = "Je hebt verkeerde gegevens ingevuld";
	} else {

		$correctPassword = $user[0]['password'];
		$salt = $user[0]['salt'];
		$inputPassword = hashPassword($salt, $_POST['password']);

		//Checks if the returned array is empty and if the email and password match the input value's.
		if ($correctPassword == $inputPassword) {
			//Create basic sessions
			$_SESSION["loggedIn"] = true;
			$_SESSION["teamId"] = $user[0]['id'];
			$_SESSION['teamName'] = $user[0]['name'];
			setcookie("teamId", $user[0]['id'], time() + 360000);  /* expire in 100 hour */
			setcookie("teamName", $user[0]['name'], time() + 360000);  /* expire in 100 hour */


			//If this is first login, go to the wizard
			if ($user[0]['firstTimeLogin'] == 0) {
				header("Location: teamaccount.php");
				//Aan het eind van wizard firstTimeLogin als 1 zetten als we foto hebben en teamnaam etc.
				exit;
				//Else, we can start the game
			} else if ($user[0]['firstTimeLogin'] == 1) {

				$_SESSION['teamSelfChosenTeamName'] = $user[0]['selfChosenTeamName'];
				setcookie("teamSelfChosenTeamName", $user[0]['selfChosenTeamName'], time() + 360000);  /* expire in 100 hour */


				header("Location: index.php");
				exit;
			} else {
				echo "An error occurred. Please contact the school.";
			}

		} else {
			//If there is no match, show message with the result.
			$danger = "Inloggen is niet gelukt. Probeer het opnieuw.";
		}
	}
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
							<li><a href="info.php">Info</a></li>
							<li><a href="uploadtest.php">Dat Upload</a></li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="inner cover">
				<div class="row">
					<section class="col-md-12">

						<?php if (isset ($warning)) {
							echo '<p style="margin-top: 10px; color: #ffffff;">' . $warning . '</p>';
						}
						if (isset ($danger)) {
							echo '<p style="margin-top: 10px; color: #ffffff;">' . $danger . '</p>';
						} ?>
						<h4 style="margin-top: 15px;">Log in en begin het spel!</h4>

						<form action="<?= $_SERVER['PHP_SELF']; ?>" method="POST">
							<div class="form-group">
								<label for="teamName">Teamnaam:</label>
								<input name="teamName" type="text" id="teamName" class="form-control" required>
							</div>
							<div class="form-group">
								<label for="password">Wachtwoord:</label>
								<input name="password" type="password" id="password" class="form-control" required>
							</div>

							<input type="submit" name="submit" id="submit" class="btn btn-default" value="Inloggen">

						</form>
					</section>
				</div>
			</div>
		</div>
	</div>
</div>


</body>
</html>