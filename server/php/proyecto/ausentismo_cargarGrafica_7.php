<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Desde = addslashes($_POST['Desde']);
   $Hasta = addslashes($_POST['Hasta']);

   $sql = "SELECT 
               au_registro.TipoEvento AS Etiqueta,
               DATE_FORMAT(au_registro.FechaInicial, '%Y-%m') AS Etiqueta2,
               COUNT(au_registro.id) AS Cantidad,
               SUM(au_registro.DiasDeIncapacidad) AS Dias
            FROM
               au_registro
            WHERE 
               au_registro.idEmpresa = '$idEmpresa'
               AND DATE_FORMAT(au_registro.FechaInicial, '%Y') = '" . substr($Desde, 0, 4) . "'
            GROUP BY 
               au_registro.TipoEvento,
               DATE_FORMAT(au_registro.FechaInicial, '%Y-%m') 
            ORDER BY au_registro.FechaInicial;";

   $result = $link->query(utf8_decode($sql));
   $idx=0;

   $meses = array();
   if ( $result->num_rows > 0){
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result)){
         foreach ($row as $key => $value){
            $row[$key] = utf8_encode($value);
         }

         if (!isset($Resultado[$row['Etiqueta']])){
            $Resultado[$row['Etiqueta']] = array();
            $meses[$row['Etiqueta']] = 1;
         }

         for ($i= $meses[$row['Etiqueta']]; $i < intval(substr($row['Etiqueta2'], 5, 2)); $i++) { 
            $tmpM = $i;
            if ($i < 10){
               $tmpM = '0' . $i;
            }

            array_push($Resultado[$row['Etiqueta']], ['mes' => substr($row['Etiqueta2'], 0, 4) . '-' . $tmpM, 'cantidad' => 0, 'dias' => 0 ]);
         }

         array_push($Resultado[$row['Etiqueta']], ['mes' => $row['Etiqueta2'], 'cantidad' => $row['Cantidad'], 'dias' => $row['Dias'] ]);

         $meses[$row['Etiqueta']] = intval(substr($row['Etiqueta2'], 5, 2));
      }
      $y = substr($Desde, 0, 4);
      
      foreach ($Resultado as $key => $value) {
         for ($i=1; $i < 13; $i++) { 
            $tmpM = $i;
            if ($i < 10){
               $tmpM = '0' . $i;
            }

            if (!isset($val[$y . '-' . $tmpM])){
               array_push($Resultado[$key], ['mes' => $y . '-' . $tmpM, 'cantidad' => 0, 'dias' => 0 ]);
            }
         }
      }
         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>