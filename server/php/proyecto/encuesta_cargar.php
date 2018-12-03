<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);


   $sql = "SELECT 
               encuestas.id,
               encuestas.Titulo,
               encuestas.hash,
               COUNT(DISTINCT encuestas_abiertas.id) AS Cantidad,
               COUNT(DISTINCT encuestas_abiertas_2.id) AS Finalizadas
            FROM
               encuestas
               LEFT JOIN encuestas_abiertas
                  ON encuestas_abiertas.idEncuesta = encuestas.id
               LEFT JOIN encuestas_abiertas AS encuestas_abiertas_2
                  ON encuestas_abiertas_2.idEncuesta = encuestas.id
                  AND encuestas_abiertas_2.estado = 1
            WHERE 
               encuestas.idEmpresa = '$idEmpresa'
            GROUP BY
               encuestas.id,
               encuestas.Titulo;";

   $result = $link->query(utf8_decode($sql));
   $idx=0;
   $Resultado = array();
   if ( $result->num_rows > 0){
      while ($row = mysqli_fetch_assoc($result)){
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) {
            $Resultado[$idx][$key] = utf8_encode($value);
         }
         $Resultado[$idx]['Link'] = "e=$idEmpresa&p=" . md5(md5($idEmpresa)) . "&h=" . $row['hash'];
         $idx++;
      }
   }

   mysqli_free_result($result);  
   echo json_encode($Resultado);
?>