<?php

//Starts session so we can use the session variables.
session_start();
//Include db.php file to use our code on multiple pages.
require_once 'assets/php/config.php';
require_once 'assets/php/db.php';
require_once 'assets/php/password-validation.php';

//Checks if the session variable 'loggedIn' exists, which only is granted to users who've validated their logindata.
if (isset($_SESSION["loggedIn"])) {
	header("Location: index.php");
	exit;
}
if (isset($_POST['submitRegister'])) {

	if (!empty($_POST['name']) && !empty($_POST['password'])) {
		$name = dataFilter($_POST['name'], $dbLink);

		$salt = generateSalt();
		$hash = hashPassword($salt, $_POST['password']);

		$insert = "INSERT INTO `teams` (`name`, `password`, `salt`, `firstTimeLogin`, `admin`) VALUES ('" . $name . "', '" . $hash . "', '" . $salt . "', 0, 0 )";
		queryToDatabase($dbLink, $insert);
		header("Location: login.php?registered");
		exit;
	} else {
		$danger = "Vul alle velden in.";
	}

}

?>

<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>TuneDrop</title>
	<!-- Bootstrap core CSS -->
	<link href="assets/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="site-wrapper">
	<div class="container">


		<span>Heeft u al een account? </span><a href="login.php">Ga naar de login pagina.</a>

		<form action="<?= $_SERVER['PHP_SELF']; ?>" method="POST">
			<div class="form-group">
				<label for="name">Naam:</label>
				<input name="name" type="text" id="name" <?php if (isset($_POST['submitRegister'])) { ?>
				       value="<?php echo $_POST['name'];
				       } ?>" class="form-control">
			</div>
			<div class="form-group">
				<label for="password">Wachtwoord:</label>
				<input name="password" type="password" id="password" <?php if (isset($_POST['submitRegister'])) { ?>
				       value="<?php echo $_POST['password'];
				       } ?>" class="form-control">
			</div>

			<input type="submit" name="submitRegister" id="submit" class="btn btn-info" value="Registreer">

		</form>

	</div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/buildMap.js"></script>
<script src="assets/js/buildGrid.js"></script>
<script src="assets/js/customMap.js"></script>
<script src="assets/js/getLocation.js"></script>
<script src="assets/js/main.js"></script>

</body>
</html>