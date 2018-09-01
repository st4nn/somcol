<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idTema = addslashes($_POST['idTema']);

  	$sql = "DELETE FROM capacitaciones_Temas WHERE id = '$idTema';";

    $link->query(utf8_decode($sql));

	if ( $link->error == ""){
		echo $link->insert_id;
    $sql = "DELETE FROM capacitaciones_Cargo WHERE idTema = '$idTema';";
    $link->query(utf8_decode($sql));    
	} else{
		echo $link->error;
	}
?> 