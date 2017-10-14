<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idCantidato = addslashes($_POST['idCandidato']);
   $Usuario = addslashes($_POST['Usuario']);


      $sql = "DELETE FROM cp_AEC_Candidatos WHERE idCandidato = '$idCandidato';";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         echo $link->insert_id;
      } else
      {
         echo $link->error;
      }
   
?> 