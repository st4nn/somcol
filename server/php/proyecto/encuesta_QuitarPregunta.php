<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idPregunta = addslashes($_POST['idPregunta']);

   $sql = "DELETE FROM encuestas_opciones WHERE idPregunta = '$idPregunta';";
    $link->query(utf8_decode($sql));

  	$sql = "DELETE FROM encuestas_preguntas WHERE id = '$idPregunta';";

    $link->query(utf8_decode($sql));

	if ( $link->error == ""){
		echo $link->insert_id;
	} else{
		echo $link->error;
	}
?> 