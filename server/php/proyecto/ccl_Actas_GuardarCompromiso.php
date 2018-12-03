<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $Anio = addslashes($_POST['Anio']);
   $NoActa = addslashes($_POST['NoActa']);
   $Descripcion = addslashes($_POST['Descripcion']);
   $Responsable = addslashes($_POST['Responsable']);
   $Fecha = addslashes($_POST['Fecha']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0")
   {
      $id = "NULL";
   }

      $sql = "INSERT INTO ccl_Actas_Compromisos(id, idEmpresa, idUsuario, NoActa, Anio, Descripcion, Responsable, Fecha) VALUES 
      (
         $id, 
         '" . $idEmpresa . "',
         '" . $idUsuario . "',
         '" . $NoActa . "',
         '" . $Anio . "',
         '" . $Descripcion . "',
         '" . $Responsable . "',
         '" . $Fecha . "'
      ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      Anio = VALUES(Anio),
      NoActa = VALUES(NoActa),
      Descripcion = VALUES(Descripcion),
      Responsable = VALUES(Responsable),
      Fecha = VALUES(Fecha);";

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