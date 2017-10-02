<?php
   include("../conectar.php"); 
   $link = Conectar();
   $id = addslashes($_POST['id']);
   $Nombre = addslashes($_POST['Nombre']);
   $Direccion = addslashes($_POST['Direccion']);
   $Correo = addslashes($_POST['Correo']);
   $Telefono = addslashes($_POST['Telefono']);
   $idUsuario = addslashes($_POST['Usuario']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL")
   {
      $id = "NULL";
   }

      $sql = "INSERT INTO Empresas(id, Nombre, Direccion, Correo, Telefono, idUsuario) VALUES 
      (
         $id, 
         '" . $Nombre . "',
         '" . $Direccion . "',
         '" . $Correo . "',
         '" . $Telefono . "',
         '" . $idUsuario . "'
      ) ON DUPLICATE KEY UPDATE
      Nombre = VALUES(Nombre),
      Direccion = VALUES(Direccion),
      Correo = VALUES(Correo),
      Telefono = VALUES(Telefono),
      idUsuario = VALUES(idUsuario);";

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