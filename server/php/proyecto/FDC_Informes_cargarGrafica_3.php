<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Desde = addslashes($_POST['Desde']);
   $Hasta = addslashes($_POST['Hasta']);

   $sql = "SELECT 
               fallasDeControl.Personas AS Etiqueta,
               COUNT(fallasDeControl.id) AS Cantidad
            FROM
               fallasDeControl
            WHERE 
               fallasDeControl.idEmpresa = '$idEmpresa'
               AND fallasDeControl.FechaDeFalla >= '$Desde 00:00:00'
               AND fallasDeControl.FechaDeFalla <= '$Hasta 23:59:59'
            GROUP BY 1
            ORDER BY 1;";

   $result = $link->query(utf8_decode($sql));
   $idx=0;
   if ( $result->num_rows > 0){
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result)){
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) {
            $Resultado[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else{
      echo 0;
   }
?>