<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idCantidato = addslashes($_POST['idCandidato']);
   $Votos = addslashes($_POST['Votos']);


      $sql = "INSERT INTO ccl_AEC_Candidatos(id, Votos) VALUES 
      (
         '" . $idCantidato . "',
         '" . $Votos . "'
      ) ON DUPLICATE KEY UPDATE
      Votos = VALUES(Votos);";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         echo $link->insert_id;
      } else
      {
         echo $link->error;
      }
   
?> 