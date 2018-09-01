<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idE']);

   $sql = "SELECT
            Empresas.*,
            Archivos.Ruta,
            Archivos.Nombre AS Archivo
          FROM
            Empresas
            LEFT JOIN (SELECT Prefijo, MAX(id) AS id FROM Archivos WHERE Proceso = 'empresa_Logo' GROUP BY Prefijo) bArchivos ON bArchivos.Prefijo = Empresas.id
            LEFT JOIN Archivos ON Archivos.id = bArchivos.id
         WHERE
            Empresas.Estado > 0 AND Empresas.id = '$idEmpresa'
         GROUP BY
            Empresas.id
         ORDER BY Empresas.Nombre;";


   $result = $link->query($sql);

   if ( $result->num_rows > 0){
      
      while ($row = mysqli_fetch_assoc($result)){
         $Usuarios = array();
         foreach ($row as $key => $value){
            $Usuarios[$key] = utf8_encode($value);
         }
      }

      mysqli_free_result($result);  
      echo json_encode($Usuarios);
   } else{
      echo 0;
   }
?>