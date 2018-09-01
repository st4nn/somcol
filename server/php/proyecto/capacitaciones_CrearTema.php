<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $id = addslashes($_POST['id']);
   $Programa = addslashes($_POST['Programa']);
   $Tema = addslashes($_POST['Tema']);
   $Tipo = addslashes($_POST['Tipo']);
   $Intensidad = addslashes($_POST['Intensidad']);


      $sql = "INSERT INTO capacitaciones_Temas(id, idUsuario, idEmpresa, Programa, Tipo, Tema, Intensidad) VALUES 
      (
         '" . $id . "',
         '" . $idUsuario . "',
         '" . $idEmpresa . "',
         '" . $Programa . "',
         '" . $Tipo . "',
         '" . $Tema . "',
         '" . $Intensidad . "'
      ) ON DUPLICATE KEY UPDATE
         Programa = VALUES(Programa),
         Tipo = VALUES(Tipo),
         Tema = VALUES(Tema),
         Intensidad = VALUES(Intensidad);";

      $link->query(utf8_decode($sql));


      if ( $link->error == ""){
         echo $link->insert_id;
      } else{
         echo $link->error;
      }
   
?> 