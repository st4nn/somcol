<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $Anio = addslashes($_POST['Anio']);
   $idEmpresa = addslashes($_POST['Empresa']);
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   if ($Usuario['idPerfil'] > 1)
   {
      $eUsuario = " AND cp_AEC_Candidatos.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }

   $tipo = '';
   if (array_key_exists('Tipo', $_POST)){
      $tipo = " AND cp_AEC_Candidatos.Tipo = '". addslashes($_POST['Tipo']) . "' ";
   }

   $sql = "SELECT
            cp_AEC_Candidatos.*
          FROM
            cp_AEC_Candidatos
         WHERE
            cp_AEC_Candidatos.idEmpresa = '$idEmpresa'
            AND cp_AEC_Candidatos.Anio = '$Anio' $tipo $eUsuario;";
            
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