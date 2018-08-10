<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   $Cedula = addslashes($_POST['cc']);

   $sql = "SELECT 
               personal.id,
               personal.idEmpresa,
               personal.Nombres,
               personal.Apellidos,
               Empresas.Nombre AS Empresa,
               Archivos.Ruta,
               Archivos.Nombre AS Logo
            FROM 
               personal
               INNER JOIN Empresas 
                  on personal.idEmpresa = Empresas.id
               LEFT JOIN Archivos
                  on Archivos.Proceso = 'empresa_Logo' AND Empresas.id = Archivos.Prefijo
            WHERE 
               Cedula = '$Cedula';";


   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      
      while ($row = mysqli_fetch_assoc($result)){
         $Usuarios = array();
         foreach ($row as $key => $value){
            $Usuarios[$key] = utf8_encode($value);
         }
      }

      mysqli_free_result($result);  
      echo json_encode($Usuarios);
   } else
   {
      echo 0;
   }
?>