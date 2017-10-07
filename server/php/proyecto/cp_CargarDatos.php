<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $Anio = addslashes($_POST['Anio']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   $eUsuario2 = '';
   if ($Usuario['idPerfil'] > 1)
   {
      $eUsuario = " AND cp_AEC.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
      $eUsuario2 = " AND cp_AEC_Candidatos.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }  

   $Resultado = array('Datos' => 0, 'Candidatos' => 0);

   $sql = "SELECT
            cp_AEC.*
          FROM
            cp_AEC
         WHERE
            cp_AEC.idEmpresa = '$idEmpresa'
            AND cp_AEC.Anio = '$Anio' $eUsuario;";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['Datos'] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['Datos'][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
   } 

   $sql = "SELECT
            cp_AEC_Candidatos.*
          FROM
            cp_AEC_Candidatos
         WHERE
            cp_AEC_Candidatos.idEmpresa = '$idEmpresa'
            AND cp_AEC_Candidatos.Anio = '$Anio' $eUsuario2;";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado['Candidatos'] = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['Candidatos'][$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['Candidatos'][$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
   } 
   
   echo json_encode($Resultado); 
?>