<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $Titulo = addslashes($_POST['Titulo']);
   
   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0"){
      $id = "NULL";
   }

   $sql = "INSERT INTO encuestas(id, idUsuario, idEmpresa, Titulo) VALUES ( 
      $id, 
      '" . $idUsuario . "',
      '" . $idEmpresa . "',
      '" . $Titulo . "'
   ) ON DUPLICATE KEY UPDATE
   Titulo = VALUES(Titulo),
   fechaCargue = '" . date('Y-m-d H:i:s') . "';";


   $link->query(utf8_decode($sql));


   if ( $link->error == "")
   {
      if ($id == 'NULL'){
         $id = $link->insert_id;
      }
      echo $id;

      $sql = "UPDATE encuestas SET hash = md5($id) WHERE id = $id;";
      $link->query(utf8_decode($sql));
   } else{
      echo $link->error;
   }
   
?> 