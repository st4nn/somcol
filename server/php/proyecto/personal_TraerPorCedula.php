<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Cedula = addslashes($_POST['Cedula']);
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   $eUsuario2 = '';
   if ($Usuario['idPerfil'] > 1)
   {
      /*$eUsuario = " AND cp_AEC.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
      $eUsuario2 = " AND cp_AEC_Candidatos.idEmpresa = '" . $Usuario['idEmpresa'] . "'";*/
   }  

   $sql = "SELECT
            personal.*
          FROM
            personal
         WHERE
            personal.idEmpresa = '$idEmpresa'
            AND personal.Cedula = '$Cedula';";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         foreach ($row as $key => $value) 
         {
            $Resultado[$key] = utf8_encode($value);
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