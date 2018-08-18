<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);

   $sql = "SELECT 
               fallasDeControl.Tipo AS Etiqueta,
               DATE_FORMAT(fallasDeControl.FechaDeRemision, '%Y-%m') AS Etiqueta2,
               COUNT(fallasDeControl.id) AS Cantidad
            FROM
               fallasDeControl
            WHERE 
               fallasDeControl.idEmpresa = '$idEmpresa'
               AND DATE_FORMAT(fallasDeControl.FechaDeRemision, '%Y') = '" . date('Y') . "'
            GROUP BY 
               fallasDeControl.Tipo,
               DATE_FORMAT(fallasDeControl.FechaDeRemision, '%Y-%m') 
            ORDER BY 
               fallasDeControl.Tipo, 
               fallasDeControl.FechaDeRemision;";

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

            array_push($Resultado[$row['Etiqueta']], ['mes' => substr($row['Etiqueta2'], 0, 4) . '-' . $tmpM, 'cantidad' => 0 ]);
         }

         array_push($Resultado[$row['Etiqueta']], ['mes' => $row['Etiqueta2'], 'cantidad' => intval($row['Cantidad']) ]);

         $meses[$row['Etiqueta']] = intval(substr($row['Etiqueta2'], 5, 2)) + 1;
      }
      $y = date('Y');
      
      foreach ($Resultado as $key => $value) {
         for ($i=1; $i < 12; $i++) { 
            $tmpM = ($i+1);
            if ($i < 9){
               $tmpM = '0' . ($i + 1);
            }


            if (!isset($value[intval($i)])){
               array_push($Resultado[$key], ['mes' => $y . '-' . $tmpM, 'cantidad' => 0 ]);
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