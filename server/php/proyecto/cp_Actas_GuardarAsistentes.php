<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $Anio = addslashes($_POST['Anio']);
   $NoActa = addslashes($_POST['NoActa']);
   $Nombre = addslashes($_POST['Nombre']);
   $Cargo = addslashes($_POST['Cargo']);
   $Telefono = addslashes($_POST['Telefono']);
   $Correo = addslashes($_POST['Correo']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0")
   {
      $id = "NULL";
   }

      $sql = "INSERT INTO cp_Actas_Asistentes(id, idEmpresa, idUsuario, NoActa, Anio, Nombre, Cargo, Telefono, Correo) VALUES 
      (
         $id, 
         '" . $idEmpresa . "',
         '" . $idUsuario . "',
         '" . $NoActa . "',
         '" . $Anio . "',
         '" . $Nombre . "',
         '" . $Cargo . "',
         '" . $Telefono . "',
         '" . $Correo . "'
      ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      Anio = VALUES(Anio),
      NoActa = VALUES(NoActa),
      Nombre = VALUES(Nombre),
      Cargo = VALUES(Cargo),
      Telefono = VALUES(Telefono),
      Correo = VALUES(Correo);";

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