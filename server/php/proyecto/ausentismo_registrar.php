<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $TipoEvento = addslashes($_POST['TipoEvento']);
   $IncapacidadTipo = addslashes($_POST['IncapacidadTipo']);
   $FechaInicial = addslashes($_POST['FechaInicial']);
   $FechaFinal = addslashes($_POST['FechaFinal']);
   $CodigoDiagnostico = addslashes($_POST['CodigoDiagnostico']);
   $Observaciones = addslashes($_POST['Observaciones']);
   $idPersonal = addslashes($_POST['idPersonal']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0")
   {
      $id = "NULL";
   }

      $sql = "INSERT INTO au_registro(id, idEmpresa, idUsuario, idPersonal, TipoEvento, IncapacidadTipo, FechaInicial, FechaFinal, CodigoDiagnostico, Observaciones) VALUES 
      (
         $id, 
         '" . $idEmpresa . "',
         '" . $idUsuario . "',
         '" . $idPersonal . "',
         '" . $TipoEvento . "',
         '" . $IncapacidadTipo . "',
         '" . $FechaInicial . "',
         '" . $FechaFinal . "',
         '" . $CodigoDiagnostico . "',
         '" . $Observaciones . "'
      ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      idPersonal = VALUES(idPersonal),
      TipoEvento = VALUES(TipoEvento),
      IncapacidadTipo = VALUES(IncapacidadTipo),
      FechaInicial = VALUES(FechaInicial),
      FechaFinal = VALUES(FechaFinal),
      CodigoDiagnostico = VALUES(CodigoDiagnostico),
      Observaciones = VALUES(Observaciones),
      fechaCargue = '" . date('Y-m-d H:i:s') . "';";

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