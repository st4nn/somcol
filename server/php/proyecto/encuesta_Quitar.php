<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEncuesta = addslashes($_POST['idEncuesta']);

  	$sql = "DELETE FROM encuestas WHERE id = '$idEncuesta';";

    $link->query(utf8_decode($sql));

	if ( $link->error == ""){
		echo $link->insert_id;
	} else{
		echo $link->error;
	}
?> 