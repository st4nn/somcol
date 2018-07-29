<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   $Cedula = addslashes($_POST['Cedula']);
   $idEmpresa = addslashes($_POST['idEmpresa']);

   $sql = "SELECT 
               *
            FROM 
               personal
            WHERE 
               Cedula = '$Cedula'
               AND idEmpresa = '$idEmpresa';";


   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      $row = $result->fetch_assoc();
      
      $Usuarios = array();
      foreach ($row as $key => $value) 
      {
         $Usuarios[$key] = utf8_encode($value);
      }

      mysqli_free_result($result);  
      echo json_encode($Usuarios);
   } else
   {
      echo 0;
   }
?>