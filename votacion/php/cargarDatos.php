<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Anio = addslashes($_POST['Anio']);
   $Key = addslashes($_POST['key']);

   $sql = "SELECT 
               Empresas.Nombre,
               Empresas.Correo,
               Archivos.Ruta,
               Archivos.Nombre AS 'Logo'
            FROM 
               Empresas
               LEFT JOIN Archivos ON 
                  Archivos.Proceso = 'empresa_Logo' 
                  AND Archivos.Prefijo = Empresas.id
            WHERE
               Empresas.id = '$idEmpresa'
               AND md5(md5(Empresas.id)) = '$Key'";


   $result = $link->query($sql);
   $idx = 0;

   if ( $result->num_rows > 0)
   {
      $Datos = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Datos[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Datos[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Datos);
   } else
   {
      echo 0;
   }
?>