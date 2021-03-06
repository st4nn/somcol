<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Anio = addslashes($_POST['Anio']);
   $p = addslashes($_POST['p']);

   $sql = "SELECT 
               ccl_AEC_Candidatos.id AS idCandidato,
               count(ccl_votos.idCandidato) AS votos,
               ccl_AEC_Candidatos.Nombre AS Nombre,
               ccl_AEC_Candidatos.idEmpresa AS idEmpresa,
               ccl_AEC_Candidatos.Anio AS Anio
            FROM
               ccl_AEC_Candidatos
               LEFT JOIN ccl_votos on 
                  ccl_AEC_Candidatos.id = ccl_votos.idCandidato
            WHERE 
               ccl_AEC_Candidatos.Tipo = 'Trabajador'
               AND ccl_AEC_Candidatos.idEmpresa = '$idEmpresa'
               AND ccl_AEC_Candidatos.Anio = '$Anio'
               AND md5(md5(ccl_AEC_Candidatos.idEmpresa)) = '$p'
            GROUP BY ccl_AEC_Candidatos.id;";


   $sql2 = "SELECT 
               *
            FROM 
               Archivos
            WHERE
               Proceso = 'Candidatos_Foto' AND Prefijo IN (
                  SELECT 
                     id
                  FROM 
                     ccl_AEC_Candidatos
                  WHERE
                     idEmpresa = '$idEmpresa'
                     AND Anio = '$Anio'
                     AND Tipo = 'Trabajador'
               ) ORDER BY id;";

   $result = $link->query($sql);
   $result2 = $link->query($sql2);
   $idx = 0;

   $fotos = array();
   while ($row = mysqli_fetch_assoc($result2)){
      $fotos[$row['Prefijo']] = '../server/php/' . $row['Ruta'] . '/' . $row['Nombre'];
   }

   if ( $result->num_rows > 0)
   {
      $Datos = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Datos[$idx] = array();
         foreach ($row as $key => $value) {
            $Datos[$idx][$key] = utf8_encode($value);
         }

         if (isset($fotos[$row['idCandidato']])){
            $Datos[$idx]['foto'] = utf8_encode($fotos[$row['idCandidato']]);
         } else{
            $Datos[$idx]['foto'] = '../assets/portraits/5.png';
         }

         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Datos);
   } else
   {
      echo 0;
   }
?>