<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idCantidato = addslashes($_POST['idCandidato']);
   $Posicion = addslashes($_POST['Posicion']);


      $sql = "INSERT INTO cp_AEC_Candidatos(id, Posicion) VALUES 
      (
         '" . $idCantidato . "',
         '" . $Posicion . "'
      ) ON DUPLICATE KEY UPDATE
      Posicion = VALUES(Posicion);";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         echo $link->insert_id;
      } else
      {
         echo $link->error;
      }
   
?> 