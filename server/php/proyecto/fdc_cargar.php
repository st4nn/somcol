<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $Parametro = addslashes($_POST['idFalla']);
   
   $sql = "SELECT
            fallasDeControl.*,
            fdcPlanesDeAccion.id AS PDA_id,
            fdcPlanesDeAccion.TipoDeAccion AS PDA_TipoDeAccion,
            fdcPlanesDeAccion.TipoDeAccion AS PDA_TipoDeAccion,
            fdcPlanesDeAccion.Actividad AS PDA_Actividad,
            fdcPlanesDeAccion.Responsable AS PDA_Responsable,
            fdcPlanesDeAccion.FechaEstimadaDeEjecucion AS PDA_FechaEstimadaDeEjecucion,
            fdcPlanesDeAccion.FechaRealDeEjecucion AS PDA_FechaRealDeEjecucion
          FROM
            fallasDeControl
            LEFT JOIN fdcPlanesDeAccion
               ON fdcPlanesDeAccion.idFalla = fallasDeControl.id
         WHERE
            fallasDeControl.id = '$Parametro';";
            
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