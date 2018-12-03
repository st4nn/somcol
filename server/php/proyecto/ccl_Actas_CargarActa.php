<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idActa = addslashes($_POST['idActa']);
   
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   $eUsuario2 = '';
   if ($Usuario['idPerfil'] > 1)
   {
      $eUsuario = " AND ccl_AEC.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
      $eUsuario2 = " AND ccl_AEC_Candidatos.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }  

   $Resultado = array('d' => 0, 'c' => 0, 'n' => 0);

   $sql = "SELECT
            ccl_Actas.*
          FROM
            ccl_Actas
         WHERE
            ccl_Actas.id = '$idActa';";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['d'] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['d'][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
   } 

   $sql = "SELECT
            ccl_Actas_Asistentes.*
          FROM
            ccl_Actas_Asistentes
            INNER JOIN ccl_Actas ON ccl_Actas.Anio = ccl_Actas_Asistentes.Anio AND ccl_Actas.NoActa = ccl_Actas_Asistentes.NoActa AND ccl_Actas.idEmpresa = ccl_Actas_Asistentes.idEmpresa
         WHERE
            ccl_Actas.id = '$idActa';;";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado['a'] = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['a'][$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['a'][$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
   } 

   $sql = "SELECT
            ccl_Actas_Compromisos.*
          FROM
            ccl_Actas_Compromisos
            INNER JOIN ccl_Actas ON ccl_Actas.Anio = ccl_Actas_Compromisos.Anio AND ccl_Actas.NoActa = ccl_Actas_Compromisos.NoActa AND ccl_Actas.idEmpresa = ccl_Actas_Compromisos.idEmpresa
         WHERE
            ccl_Actas.id = '$idActa';";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado['c'] = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['c'][$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['c'][$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
   } 
   
   echo json_encode($Resultado); 
?>