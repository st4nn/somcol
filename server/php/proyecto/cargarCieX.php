<?php
  include("../conectar.php"); 
   $link = Conectar();

   $parametro = addslashes($_GET['p']);

   $sql = "SELECT 
               confCieX.*
            FROM
               confCieX
            WHERE 
               confCieX.Codigo LIKE '%$parametro%'
               OR confCieX.Descripcion LIKE '%$parametro%'
            LIMIT 10;";

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