<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $Parametro = addslashes($_POST['Parametro']);
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   if ($Usuario['idPerfil'] > 1)
   {
      $eUsuario = " WHERE Perfiles.idPerfil >= '" . $Usuario['idPerfil'] . "'";
   }

   $eParametro = "";
   if ($Parametro != '')
   {
      $eParametro = $Parametro;
   }  

   $sql = "SELECT
            Perfiles.idPerfil AS id,
            Perfiles.Nombre
          FROM
            Perfiles
         $eUsuario
         ORDER BY
            Perfiles.idPerfil;";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
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