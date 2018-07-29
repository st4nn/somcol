<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);

   $sql = "SELECT 
               au_registro.TipoEvento AS Etiqueta,
               COUNT(au_registro.id) AS Cantidad,
               SUM(au_registro.DiasDeIncapacidad) AS Dias
            FROM
               au_registro
            WHERE idEmpresa = '$idEmpresa'
            GROUP BY au_registro.TipoEvento;";

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