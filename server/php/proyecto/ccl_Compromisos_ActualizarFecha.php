<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $id = addslashes($_POST['id']);
   $fechaCumplimiento = addslashes($_POST['fechaCumplimiento']);



      $sql = "INSERT INTO ccl_Actas_Compromisos(id, fechaCumplimiento) VALUES 
      (
         $id, 
         '" . $fechaCumplimiento . "'
      ) ON DUPLICATE KEY UPDATE
      fechaCumplimiento = VALUES(fechaCumplimiento);";

      $link->query(utf8_decode($sql));


      if ( $link->error == ""){
         if ($id == 'NULL'){
            echo $link->insert_id;
         } else{
            echo $id;
         }
      } else{
         echo $link->error;
      }
   
?> 