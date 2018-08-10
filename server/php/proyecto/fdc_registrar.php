<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = "NULL";
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);
   $nombreUsuario = addslashes($_POST['nombreUsuario']);

   $Prefijo          = addslashes($_POST['idArchivo']);
   $DescCorta        = addslashes($_POST['DescCorta']);
   $FechaDeRemision  = addslashes($_POST['FechaDeRemision']);
   $FechaDeFalla     = addslashes($_POST['FechaDeFalla']);
   $HoraDeFalla      = addslashes($_POST['HoraDeFalla']);
   $Lugar            = addslashes($_POST['Lugar']);
   $Dependencia      = addslashes($_POST['Dependencia']);
   $Contratista      = addslashes($_POST['Contratista']);
   $Contrato         = addslashes($_POST['Contrato']);
   $Tipo             = addslashes($_POST['Tipo']);
   $Consecuencia     = addslashes($_POST['Consecuencia']);
   $RAM              = addslashes($_POST['RAM']);
   $Personas         = addslashes($_POST['Personas']);
   $Propiedad        = addslashes($_POST['Propiedad']);
   $Proceso          = addslashes($_POST['Proceso']);
   $Afectado_Cedula  = addslashes($_POST['Afectado_Cedula']);
   $Afectado_Nombre  = addslashes($_POST['Afectado_Nombre']);
   $Afectado_Cargo   = addslashes($_POST['Afectado_Cargo']);
   $Actividad        = addslashes($_POST['Actividad']);
   $Clasificacion    = addslashes($_POST['Clasificacion']);
   $Descripcion      = addslashes($_POST['Descripcion']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0"){
      $id = "NULL";
   }

      $sql = "INSERT INTO fallasDeControl(id, Prefijo, idUsuario, nombreUsuario, idEmpresa, DescCorta, FechaDeRemision, FechaDeFalla, HoraDeFalla, Lugar, Dependencia, Contratista, Contrato, Tipo, Consecuencia, RAM, Personas, Propiedad, Proceso, Afectado_Cedula, Afectado_Nombre, Afectado_Cargo, Actividad, Clasificacion, Descripcion) VALUES 
      (
         $id, 
         '" . $Prefijo . "',
         '" . $idUsuario . "', 
         '" . $nombreUsuario . "', 
         '" . $idEmpresa . "', 
         '" . $DescCorta . "', 
         '" . $FechaDeRemision . "', 
         '" . $FechaDeFalla . "', 
         '" . $FechaDeFalla . ' ' . $HoraDeFalla . "', 
         '" . $Lugar . "', 
         '" . $Dependencia . "', 
         '" . $Contratista . "', 
         '" . $Contrato . "', 
         '" . $Tipo . "', 
         '" . $Consecuencia . "', 
         '" . $RAM . "', 
         '" . $Personas . "', 
         '" . $Propiedad . "', 
         '" . $Proceso . "', 
         '" . $Afectado_Cedula . "', 
         '" . $Afectado_Nombre . "', 
         '" . $Afectado_Cargo . "', 
         '" . $Actividad . "', 
         '" . $Clasificacion . "', 
         '" . $Descripcion . "'
      ) ON DUPLICATE KEY UPDATE
         idUsuario = VALUES(idUsuario),
         nombreUsuario = VALUES(nombreUsuario),
         idEmpresa = VALUES(idEmpresa),
         DescCorta = VALUES(DescCorta),
         FechaDeRemision = VALUES(FechaDeRemision),
         FechaDeFalla = VALUES(FechaDeFalla),
         HoraDeFalla = VALUES(HoraDeFalla),
         Lugar = VALUES(Lugar),
         Dependencia = VALUES(Dependencia),
         Contratista = VALUES(Contratista),
         Contrato = VALUES(Contrato),
         Tipo = VALUES(Tipo),
         Consecuencia = VALUES(Consecuencia),
         RAM = VALUES(RAM),
         Personas = VALUES(Personas),
         Propiedad = VALUES(Propiedad),
         Proceso = VALUES(Proceso),
         Afectado_Cedula = VALUES(Afectado_Cedula),
         Afectado_Nombre = VALUES(Afectado_Nombre),
         Afectado_Cargo = VALUES(Afectado_Cargo),
         Actividad = VALUES(Actividad),
         Clasificacion = VALUES(Clasificacion),
         Descripcion = VALUES(Descripcion);";

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