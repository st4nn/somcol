<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $Cedula = addslashes($_POST['Cedula']);
   $Nombres = addslashes($_POST['Nombres']);
   $Apellidos = addslashes($_POST['Apellidos']);
   $FechaNacimiento = addslashes($_POST['FechaNacimiento']);
   $Genero = addslashes($_POST['Genero']);
   $Cargo = addslashes($_POST['Cargo']);
   $Grupo = addslashes($_POST['Grupo']);
   $Regional = addslashes($_POST['Regional']);
   $NombreEPS = addslashes($_POST['NombreEPS']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0")
   {
      $id = "NULL";
   }

      $sql = "INSERT INTO personal(id, idEmpresa, idUsuario, Cedula, Nombres, Apellidos, FechaNacimiento, Genero, Cargo, Grupo, Regional, NombreEPS) VALUES
      (
         $id, 
         '" . $idEmpresa . "',
         '" . $idUsuario . "',
         '" . $Cedula . "',
         '" . $Nombres . "',
         '" . $Apellidos . "',
         '" . $FechaNacimiento . "',
         '" . $Genero . "',
         '" . $Cargo . "',
         '" . $Grupo . "',
         '" . $Regional . "',
         '" . $NombreEPS . "'
      ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      Cedula = VALUES(Cedula),
      Nombres = VALUES(Nombres),
      Apellidos = VALUES(Apellidos),
      FechaNacimiento = VALUES(FechaNacimiento),
      Genero = VALUES(Genero),
      Cargo = VALUES(Cargo),
      Grupo = VALUES(Grupo),
      Regional = VALUES(Regional),
      NombreEPS = VALUES(NombreEPS);";

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