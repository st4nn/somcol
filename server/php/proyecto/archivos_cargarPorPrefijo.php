<?php
  include("../conectar.php"); 
   $link = Conectar();

   $Prefijo = addslashes($_POST['Prefijo']);
   $Proceso = "";

   if (array_key_exists('Proceso',$_POST))
   {
      $Proceso = " AND Archivos.Proceso LIKE '" . addslashes($_POST['Proceso']) . "' ";
   }

   $sql = "SELECT 
               Archivos.*,
               datosUsuarios.Nombre AS Usuario
            FROM
               Archivos
               INNER JOIN datosUsuarios ON datosUsuarios.idLogin = Archivos.idLogin
            WHERE Prefijo = '$Prefijo' $Proceso;";

   $result = $link->query(utf8_decode($sql));
   $idx=0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>