<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idOpcion = addslashes($_POST['idOpcion']);

  	$sql = "DELETE FROM encuestas_opciones WHERE id = '$idOpcion';";

    $link->query(utf8_decode($sql));

	if ( $link->error == ""){
		echo $link->insert_id;
	} else{
		echo $link->error;
	}
?> 