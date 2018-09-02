<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);
   $idTema = addslashes($_POST['idTema']);
   $Anio = addslashes($_POST['Anio']);
   $Responsable = addslashes($_POST['Responsable']);


      $sql = "INSERT INTO capacitaciones_Temas_Responsable(idTema, Anio, Responsable) VALUES (
         '" . $idTema . "',
         '" . $Anio . "',
         '" . $Responsable . "'
      ) ON DUPLICATE KEY UPDATE
         Responsable = VALUES(Responsable),
         fechaCargue = CURRENT_TIMESTAMP;";

      $link->query(utf8_decode($sql));


      if ( $link->error == ""){
         echo $link->insert_id;
      } else{
         echo $link->error;
      }
   
?> 