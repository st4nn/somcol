<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   
   $idFalla						= addslashes($_POST['idFalla']);
   $TipoDeAccion				= addslashes($_POST['TipoDeAccion']);
   $Actividad					= addslashes($_POST['Actividad']);
   $Responsable					= addslashes($_POST['Responsable']);
   $FechaEstimadaDeEjecucion	= addslashes($_POST['FechaEstimadaDeEjecucion']);
   $FechaRealDeEjecucion		= addslashes($_POST['FechaRealDeEjecucion']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0"){
      $id = "NULL";
   }

      $sql = "INSERT INTO fdcPlanesDeAccion(id, idUsuario, idEmpresa, idFalla, TipoDeAccion, Actividad, Responsable, FechaEstimadaDeEjecucion, FechaRealDeEjecucion) VALUES (
         $id, 
         '" . $idUsuario . "', 
         '" . $idEmpresa . "', 
         '" . $idFalla . "', 
         '" . $TipoDeAccion . "', 
         '" . $Actividad . "', 
         '" . $Responsable . "', 
         '" . $FechaEstimadaDeEjecucion . "', 
         '" . $FechaRealDeEjecucion . "'
      ) ON DUPLICATE KEY UPDATE
         idUsuario = VALUES(idUsuario),
         TipoDeAccion = VALUES(TipoDeAccion),
         Actividad = VALUES(Actividad),
         Responsable = VALUES(Responsable),
         FechaEstimadaDeEjecucion = VALUES(FechaEstimadaDeEjecucion),
         FechaRealDeEjecucion = VALUES(FechaRealDeEjecucion);";

   $link->query(utf8_decode($sql));

   if ( $link->error == ""){
      if ($id == 'NULL'){
         echo $link->insert_id;
      } else{
         echo $id;
      }
   } else{
      echo $link->error;
   }

   
?> 