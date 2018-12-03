<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['idUsuario']);

   $Anio = addslashes($_POST['Anio']);
   $Tipo = addslashes($_POST['Tipo']);
   $Nombre = addslashes($_POST['Nombre']);
   $Cargo = addslashes($_POST['Cargo']);
   $Identificacion = addslashes($_POST['Identificacion']);
   $Votos = addslashes($_POST['Votos']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0")
   {
      $id = "NULL";
   }

      $sql = "INSERT INTO ccl_AEC_Candidatos(id, idEmpresa, idUsuario, Anio, Tipo, Nombre, Cargo, Identificacion, Votos) VALUES 
      (
         $id, 
         '" . $idEmpresa . "',
         '" . $idUsuario . "',
         '" . $Anio . "',
         '" . $Tipo . "',
         '" . $Nombre . "',
         '" . $Cargo . "',
         '" . $Identificacion . "',
         '" . $Votos . "'
      ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      Anio = VALUES(Anio),
      Tipo = VALUES(Tipo),
      Nombre = VALUES(Nombre),
      Cargo = VALUES(Cargo),
      Identificacion = VALUES(Identificacion),
      Votos = VALUES(Votos);";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         if ($id == 'NULL')
         {
            echo $link->insert_id;
         } else
         {
            echo $id;
         }
      } else
      {
         echo $link->error;
      }
   
?> 