<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Desde = addslashes($_POST['Desde']);
   $Hasta = addslashes($_POST['Hasta']);

   $sql = "SELECT 
               confCieX.Sistema AS Etiqueta,
               COUNT(au_registro.id) AS Cantidad,
               SUM(au_registro.DiasDeIncapacidad) AS Dias
            FROM
               au_registro
               LEFT JOIN confCieX ON confCieX.Codigo = au_registro.CodigoDiagnostico
            WHERE 
               au_registro.idEmpresa = '$idEmpresa'
               AND au_registro.FechaInicial >= '$Desde 00:00:00'
               AND au_registro.FechaInicial <= '$Hasta 23:59:59'
            GROUP BY confCieX.Subsistema;";

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