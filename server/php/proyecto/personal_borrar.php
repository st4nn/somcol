<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idPersonal = addslashes($_POST['idPersonal']);

  	$sql = "DELETE FROM personal WHERE id = '$idPersonal';";

    $link->query(utf8_decode($sql));

	if ( $link->error == ""){
		echo $link->insert_id;
	} else{
		echo $link->error;
	}
?> 