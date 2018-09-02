<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idTema = addslashes($_POST['idTema']);
   $Anio = addslashes($_POST['Anio']);
   $Mes = addslashes($_POST['Mes']);
   $Semana = addslashes($_POST['Semana']);
   $Accion = addslashes($_POST['Accion']);

   $sql = '';

   if ($Accion == 'quitar'){
      $sql = "DELETE FROM capacitaciones_Temas_Programacion WHERE
               idTema = '$idTema'
               AND Anio = '$Anio'
               AND Semana = '$Semana'
               AND Mes = '$Mes';";
   } else{
      $sql = "INSERT INTO capacitaciones_Temas_Programacion(idUsuario, idTema, Anio, Semana, Mes) VALUES (
         '" . $idUsuario . "',
         '" . $idTema . "',
         '" . $Anio . "',
         '" . $Semana . "',
         '" . $Mes . "'
      ) ON DUPLICATE KEY UPDATE
         fechaCargue = CURRENT_TIMESTAMP;";
   }

   $link->query(utf8_decode($sql));


   if ( $link->error == ""){
      echo $link->insert_id;
   } else{
      echo $link->error;
   }
   
?> 