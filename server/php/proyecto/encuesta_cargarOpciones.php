<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEncuesta = addslashes($_POST['idEncuesta']);
   $idPregunta = addslashes($_POST['idPregunta']);


   $sql = "SELECT 
               encuestas_opciones.*
            FROM
               encuestas_opciones
            WHERE 
               encuestas_opciones.idEncuesta = '$idEncuesta'
               AND encuestas_opciones.idPregunta = '$idPregunta';";

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