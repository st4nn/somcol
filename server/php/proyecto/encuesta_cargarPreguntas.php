<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idEncuesta = addslashes($_POST['idEncuesta']);


   $sql = "SELECT 
               encuestas_preguntas.*,
               encuestas_preguntas.idTipoPregunta AS Tipo
            FROM
               encuestas_preguntas
            WHERE 
               encuestas_preguntas.idEncuesta = '$idEncuesta';";

   $result = $link->query(utf8_decode($sql));
   $idx=0;
   $Resultado = array();
   if ( $result->num_rows > 0){
      while ($row = mysqli_fetch_assoc($result)){
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) {
            $Resultado[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
   }

   mysqli_free_result($result);  
   echo json_encode($Resultado);
?>