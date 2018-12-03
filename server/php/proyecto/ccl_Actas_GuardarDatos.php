<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $NoActa = addslashes($_POST['NoActa']);
   $Lugar = addslashes($_POST['Lugar']);
   $Fecha = addslashes($_POST['Fecha']);
   $Departamento = addslashes($_POST['Departamento']);
   $Municipio = addslashes($_POST['Municipio']);
   $Referencia = addslashes($_POST['Referencia']);
   $Objetivo = addslashes($_POST['Objetivo']);
   $Temas = addslashes($_POST['Temas']);
   $Desarrollo = addslashes($_POST['Desarrollo']);

   $Anio = substr($Fecha, 0, 4);


      $sql = "INSERT INTO ccl_Actas(Anio, NoActa, idUsuario, idEmpresa, Lugar, Fecha, Departamento, Municipio, Referencia, Objetivo, Temas, Desarrollo) VALUES 
      (
         '" . $Anio . "',
         '" . $NoActa . "',
         '" . $idUsuario . "',
         '" . $idEmpresa . "',
         '" . $Lugar . "',
         '" . $Fecha . "',
         '" . $Departamento . "',
         '" . $Municipio . "',
         '" . $Referencia . "',
         '" . $Objetivo . "',
         '" . $Temas . "',
         '" . $Desarrollo . "'
      ) ON DUPLICATE KEY UPDATE
         Anio = VALUES(Anio),
         NoActa = VALUES(NoActa),
         idUsuario = VALUES(idUsuario),
         idEmpresa = VALUES(idEmpresa),
         Lugar = VALUES(Lugar),
         Fecha = VALUES(Fecha),
         Departamento = VALUES(Departamento),
         Municipio = VALUES(Municipio),
         Referencia = VALUES(Referencia),
         Objetivo = VALUES(Objetivo),
         Temas = VALUES(Temas),
         Desarrollo = VALUES(Desarrollo);";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         echo $link->insert_id;
      } else
      {
         echo $link->error;
      }
   
?> 