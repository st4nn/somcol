<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idCandidato = addslashes($_POST['idCandidato']);
   $Usuario = addslashes($_POST['Usuario']);


      $sql = "DELETE FROM ccl_AEC_Candidatos WHERE id = '$idCandidato';";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         echo $link->insert_id;
      } else
      {
         echo $link->error;
      }
   
?> 