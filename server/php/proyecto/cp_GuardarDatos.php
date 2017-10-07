<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $Anio = addslashes($_POST['Anio']);
   $Responsable_SGSST = addslashes($_POST['Responsable_SGSST']);
   $Responsable_SGSST_Cargo = addslashes($_POST['Responsable_SGSST_Cargo']);
   $Fecha_Apertura = addslashes($_POST['Fecha_Apertura']);
   $Fecha_Cierre = addslashes($_POST['Fecha_Cierre']);
   $Trabajadores_Directos = addslashes($_POST['Trabajadores_Directos']);
   $Fecha_Elecciones = addslashes($_POST['Fecha_Elecciones']);


      $sql = "INSERT INTO cp_AEC(idUsuario, idEmpresa, Anio, Responsable_SGSST, Responsable_SGSST_Cargo, Fecha_Apertura, Fecha_Cierre, Trabajadores_Directos, Fecha_Elecciones) VALUES 
      (
         '" . $idUsuario . "',
         '" . $idEmpresa . "',
         '" . $Anio . "',
         '" . $Responsable_SGSST . "',
         '" . $Responsable_SGSST_Cargo . "',
         '" . $Fecha_Apertura . "',
         '" . $Fecha_Cierre . "',
         '" . $Trabajadores_Directos . "',
         '" . $Fecha_Elecciones . "'
      ) ON DUPLICATE KEY UPDATE
      Responsable_SGSST = VALUES(Responsable_SGSST),
      Responsable_SGSST_Cargo = VALUES(Responsable_SGSST_Cargo),
      Fecha_Apertura = VALUES(Fecha_Apertura),
      Fecha_Cierre = VALUES(Fecha_Cierre),
      Trabajadores_Directos = VALUES(Trabajadores_Directos),
      Fecha_Elecciones = VALUES(Fecha_Elecciones),
      idUsuario = VALUES(idUsuario);";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         echo $link->insert_id;
      } else
      {
         echo $link->error;
      }
   
?> 