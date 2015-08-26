<?php

function generateSalt()
{
	$salt = base64_encode(mcrypt_create_iv(24, MCRYPT_DEV_URANDOM));
	return $salt;
}

function hashPassword($salt, $password)
{
	//$hash = hash_pbkdf2("sha256", $password, $salt, 10000, 48);
	$hash = compat_pbkdf2("sha256", $password, $salt, 10000, 48, $rawOutput = false);
	return $hash;
}

function twoFactorAuthentication()
{
	$authenticationCode = rand(0, 999999);
	$expireDate = time() + 3600;
	$_SESSION["authenticationCode"] = ["code" => $authenticationCode, "expireDate" => $expireDate];

	//As SMS is not a viable option for experimenting, I've used an email api.
	sendEmail();
}

function sendEmail()
{
	$to = $_SESSION['email'];
	$subject = 'Two-factor Login';
//	echo "Code:  " . $_SESSION["authenticationCode"]['code'];
	$message = 'Hi there. Thank you for using the two-factor authentication, it is much safer. Your code is ' . $_SESSION["authenticationCode"]['code'] . ' and valid for the next hour.';
	$headers = 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	mail($to, $subject, $message, $headers);
}

function checkPasswordOnLogin () {

}

function compat_pbkdf2($algo, $password, $salt, $iterations, $length = 0, $rawOutput = false)
{
	// check for hashing algorithm
	if (!in_array(strtolower($algo), hash_algos())) {
		trigger_error(sprintf(
			'%s(): Unknown hashing algorithm: %s',
			__FUNCTION__, $algo
		), E_USER_WARNING);
		return false;
	}
	// check for type of iterations and length
	foreach (array(4 => $iterations, 5 => $length) as $index => $value) {
		if (!is_numeric($value)) {
			trigger_error(sprintf(
				'%s() expects parameter %d to be long, %s given',
				__FUNCTION__, $index, gettype($value)
			), E_USER_WARNING);
			return null;
		}
	}
	// check iterations
	$iterations = (int)$iterations;
	if ($iterations <= 0) {
		trigger_error(sprintf(
			'%s(): Iterations must be a positive integer: %d',
			__FUNCTION__, $iterations
		), E_USER_WARNING);
		return false;
	}
	// check length
	$length = (int)$length;
	if ($length < 0) {
		trigger_error(sprintf(
			'%s(): Iterations must be greater than or equal to 0: %d',
			__FUNCTION__, $length
		), E_USER_WARNING);
		return false;
	}
	// check salt
	if (strlen($salt) > PHP_INT_MAX - 4) {
		trigger_error(sprintf(
			'%s(): Supplied salt is too long, max of INT_MAX - 4 bytes: %d supplied',
			__FUNCTION__, strlen($salt)
		), E_USER_WARNING);
		return false;
	}
	// initialize
	$derivedKey = '';
	$loops = 1;
	if ($length > 0) {
		$loops = (int)ceil($length / strlen(hash($algo, '', $rawOutput)));
	}
	// hash for each blocks
	for ($i = 1; $i <= $loops; $i++) {
		$digest = hash_hmac($algo, $salt . pack('N', $i), $password, true);
		$block = $digest;
		for ($j = 1; $j < $iterations; $j++) {
			$digest = hash_hmac($algo, $digest, $password, true);
			$block ^= $digest;
		}
		$derivedKey .= $block;
	}
	if (!$rawOutput) {
		$derivedKey = bin2hex($derivedKey);
	}
	if ($length > 0) {
		return substr($derivedKey, 0, $length);
	}
	return $derivedKey;
}
