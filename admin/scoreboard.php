<?php

require_once '../assets/php/db.php';

if (isset($_POST['red'])) {
	//Insert tablename
	$query = "INSERT INTO " . $score_table . " (`red`, `blue`, `purple`, `green`, `yellow`, `cyan`, `time`)
	VALUES ('" . $_POST['red'] . "', '" . $_POST['blue'] . "', '" . $_POST['purple'] . "', '" . $_POST['green'] . "', '" . $_POST['yellow'] . "', '" . $_POST['cyan'] . "', '" . $_POST['timestamp'] . "')";

	queryToDatabase($dbLink, $query);
}