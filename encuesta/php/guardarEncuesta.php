<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   date_default_timezone_set("America/Bogota");

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idEncuesta = addslashes($_POST['idEncuesta']);
   $idRegistro = addslashes($_POST['idRegistro']);
   $respuestas = $_POST['respuestas'];

   foreach ($respuestas as $key => $value) {
    $respuestas[$key]['valor'] = addslashes($respuestas[$key]['valor']);
    
    $sql = "INSERT INTO encuestas_respuestas (idEncuesta, idRegistro, idPregunta, Respuesta) VALUES(
      '$idEncuesta',
      '$idRegistro',
      '" . $respuestas[$key]['id'] . "',
      '" . $respuestas[$key]['valor'] . "'
    ) ON DUPLICATE KEY UPDATE
    Respuesta = VALUES(Respuesta),
    fechaCargue = '" . date('Y-m-d H:i:s') . "';";

    $link->query(utf8_decode($sql));
   }

   $sql = "UPDATE encuestas_abiertas SET estado = 1 WHERE id = $idRegistro;";

    $link->query(utf8_decode($sql));

    echo 1;
?>