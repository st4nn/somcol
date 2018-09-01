<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idTema = addslashes($_POST['idTema']);
   $Cargo = addslashes($_POST['Cargo']);
   $Tipo = addslashes($_POST['Tipo']);

  	if ($Tipo == 'quitar'){
  		$sql = "DELETE FROM capacitaciones_Cargo WHERE idTema = '$idTema' AND Cargo = '$Cargo';";
  	} else{
  		$sql = "INSERT INTO capacitaciones_Cargo (Cargo, idTema) VALUES ('$Cargo', '$idTema') ON DUPLICATE KEY UPDATE fechaCargue = CURRENT_TIMESTAMP;";
  	}

    $link->query(utf8_decode($sql));

	if ( $link->error == ""){
		echo $link->insert_id;
	} else{
		echo $link->error;
	}
?> 