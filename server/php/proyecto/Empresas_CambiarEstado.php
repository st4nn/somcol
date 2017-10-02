<?php
   include("../conectar.php"); 
   $link = Conectar();
   $id = addslashes($_POST['idEmpresa']);
   $idEstado = addslashes($_POST['idEstado']);
   $idUsuario = addslashes($_POST['Usuario']);

      $sql = "UPDATE Empresas SET Estado = '$idEstado' WHERE id = '$id';";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         echo 1;
      } else
      {
         echo $link->error;
      }
   
?> 