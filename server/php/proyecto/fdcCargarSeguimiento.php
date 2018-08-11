<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

      $sql = "SELECT 
                  fallasDeControl.id AS idFalla,
                  fallasDeControl.FechaDeRemision,
                  fallasDeControl.DescCorta,
                  fdcPlanesDeAccion.id AS idPlanDeAccion,
                  fdcPlanesDeAccion.TipoDeAccion,
                  fdcPlanesDeAccion.Actividad,
                  fdcPlanesDeAccion.Responsable,
                  fdcPlanesDeAccion.FechaEstimadaDeEjecucion,
                  fdcPlanesDeAccion.FechaRealDeEjecucion
               FROM
                  fallasDeControl
                  LEFT JOIN fdcPlanesDeAccion
                     ON fdcPlanesDeAccion.idFalla = fallasDeControl.id
               WHERE
                  fallasDeControl.idEmpresa = '$idEmpresa';";

   $result = $link->query(utf8_decode($sql));
   $idx = 0;
   if ( $result->num_rows > 0){
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result)){
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) {
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