<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Anio = addslashes($_POST['Anio']);
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   if ($Usuario['idPerfil'] > 1){
      //$eUsuario = " AND cp_AEC_Candidatos.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }

   $sql = "
         SELECT
            cp_Actas_Compromisos.*,
            cp_Actas.Fecha AS 'fechaActa'
          FROM
            cp_Actas_Compromisos
            INNER JOIN cp_Actas ON cp_Actas.Anio = cp_Actas_Compromisos.Anio AND cp_Actas.NoActa = cp_Actas_Compromisos.NoActa AND cp_Actas.idEmpresa = cp_Actas_Compromisos.idEmpresa
         WHERE
            cp_Actas_Compromisos.idEmpresa = '$idEmpresa'
            AND cp_Actas_Compromisos.Anio = '$Anio' $eUsuario;";
            
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