<?php

require_once("assets/php/config.php");
require_once("assets/php/db.php");

if(isset($_FILES['image'])){
	$errors= array();
	$file_name = $_FILES['image']['name'];
	$file_size =$_FILES['image']['size'];
	$file_tmp =$_FILES['image']['tmp_name'];
	$file_type=$_FILES['image']['type'];
	$file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
	$extensions = array("jpeg","jpg","png");

	if(in_array($file_ext,$extensions )=== false){
		$errors[]="extension not allowed, please choose a JPEG or PNG file.";
    }

	if($file_size > 5097152){
		$errors[]='File size must be around 5 MB';
	}
	if(empty($errors)==true){
		define ('SITE_ROOT', realpath(dirname(__FILE__)));
		move_uploaded_file($file_tmp,SITE_ROOT . "/assets/img/uploaded/" . $file_name);
		$path = "/github/tunedrop-introductie/assets/img/uploaded/" . $file_name;
		echo "Success: <img src='" . $path . "'/>";
	}else{
		print_r($errors);
	}
}


?>

<!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<meta name="description" content=""/>
	<link rel="stylesheet" href=""/>
	<title>Upload Test</title>
</head>
<body>

<form action="" method="POST" enctype="multipart/form-data">
	<input type="file" name="image" />
	<input type="submit"/>
</form>

</body>
</html>