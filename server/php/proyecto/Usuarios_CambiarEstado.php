<?php
   include("../conectar.php"); 
   $link = Conectar();
   $id = addslashes($_POST['idUsuario']);
   $idEstado = addslashes($_POST['idEstado']);
   $idUsuario = addslashes($_POST['Usuario']);

      $sql = "UPDATE Login SET Estado = '$idEstado' WHERE idLogin = '$id';";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         echo 1;
      } else
      {
         echo $link->error;
      }
   
?> 