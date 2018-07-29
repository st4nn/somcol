<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Anio = addslashes($_POST['Anio']);

   $sql = "SELECT 
               *
            FROM 
               cp_AEC_Candidatos
            WHERE
               idEmpresa = '$idEmpresa'
               AND Anio = '$Anio'
               AND Tipo = 'Trabajador'";

   $sql2 = "SELECT 
               *
            FROM 
               Archivos
            WHERE
               Proceso = 'Candidatos_Foto' AND Prefijo IN (
                  SELECT 
                     id
                  FROM 
                     cp_AEC_Candidatos
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

   if ( $result->num_rows > 0){
      $Datos = array();
      while ($row = mysqli_fetch_assoc($result)){
         $Datos[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Datos[$idx][$key] = utf8_encode($value);
         }
         if (isset($fotos[$row['id']])){
            $Datos[$idx]['foto'] = utf8_encode($fotos[$row['id']]);
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