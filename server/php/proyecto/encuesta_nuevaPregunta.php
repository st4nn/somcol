<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $idEncuesta = addslashes($_POST['idEncuesta']);
   $Titulo = addslashes($_POST['Titulo']);
   $Tipo = addslashes($_POST['Tipo']);
   
   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0"){
      $id = "NULL";
   }

   $sql = "INSERT INTO encuestas_preguntas(id, idUsuario, idEmpresa, idEncuesta, Titulo, idTipoPregunta) VALUES (
      $id, 
      '" . $idUsuario . "',
      '" . $idEmpresa . "',
      '" . $idEncuesta . "',
      '" . $Titulo . "',
      '" . $Tipo . "'
   ) ON DUPLICATE KEY UPDATE
   Titulo = VALUES(Titulo),
   fechaCargue = '" . date('Y-m-d H:i:s') . "';";


   $link->query(utf8_decode($sql));


   if ( $link->error == "")
   {
      if ($id == 'NULL'){
         echo $link->insert_id;
      } else{
         echo $id;
      }
   } else{
      echo $link->error;
   }
   
?> 