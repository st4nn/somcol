<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Anio = addslashes($_POST['Anio']);
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   if ($Usuario['idPerfil'] > 1)
   {
      //$eUsuario = " AND ccl_AEC_Candidatos.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }

   $sql = "SELECT
            ccl_Actas.*
          FROM
            ccl_Actas
         WHERE
            ccl_Actas.idEmpresa = '$idEmpresa'
            AND ccl_Actas.Anio = '$Anio' $eUsuario;";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
   if ( $result->num_rows > 0){
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
   } else{
      echo 0;
   }
?>