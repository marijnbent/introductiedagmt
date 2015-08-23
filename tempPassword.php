<?php

//Starts session so we can use the session variables.
session_start();
//Include db.php file to use our code on multiple pages.
require_once 'assets/php/config.php';
require_once 'assets/php/db.php';
require_once 'assets/php/password-validation.php';

if (isset($_POST['submit'])) {

	$password = $_POST['pass'];
	$salt = generateSalt();
	$hash = hashPassword($salt, $password);

	echo "Salt: <br/>" . $salt;
	echo "<br/><br/>Hash: <br/>" . $hash;
	echo "<br/><br/>Password: <br/>" . $_POST['pass'] . "<br/><br/>";


}

?>

<form action="<?= $_SERVER['PHP_SELF']; ?>" method="POST">
	<div class="form-group">
		<label for="pass">Password:</label>
		<input name="pass" type="text" id="pass" class="form-control" required>
	</div>

	<input type="submit" name="submit" id="submit" class="btn btn-default" value="Inloggen">

</form>