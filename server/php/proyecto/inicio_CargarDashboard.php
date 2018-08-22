<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);

   $Resultado = array();

   $Resultado['Personal'] = array();
   $Resultado['PersonalTotal'] = 0;

   $sql = "SELECT 
            count(personal.id) AS Cantidad, 
            personal.grupo 
         FROM 
            personal 
         WHERE 
            idEmpresa = '$idEmpresa';";

   $result = $link->query(utf8_decode($sql));
   while ($row = mysqli_fetch_assoc($result)){
      $Resultado['Personal'][utf8_encode($row['grupo'])] = $row['Cantidad'];
      $Resultado['PersonalTotal'] = $Resultado['PersonalTotal'] + intval($row['Cantidad']);
   }

   $Resultado['Calendario'] = array();

   $Anio = date('Y');
   $Mes = date('m');

   $sql = "SELECT * FROM 
         (SELECT 
            CONCAT('COPASST: ', cp_Actas_Compromisos.Descripcion, ', ', cp_Actas_Compromisos.Responsable) AS Etiqueta,
            cp_Actas_Compromisos.Fecha AS Fecha,
            cp_Actas_Compromisos.fechaCumplimiento AS Condicion
         FROM
            cp_Actas_Compromisos
         WHERE
            cp_Actas_Compromisos.idEmpresa = '$idEmpresa'
            AND YEAR(cp_Actas_Compromisos.Fecha) = '$Anio'
            AND MONTH(cp_Actas_Compromisos.Fecha) = '$Mes'
         UNION ALL
         SELECT 
            'Apertura de Votaciones COPASST' AS Etiqueta,
            cp_AEC.Fecha_AperturaVotaciones AS Fecha,
            cp_AEC.Fecha_CierreVotaciones AS Condicion
         FROM
            cp_AEC
         WHERE
            cp_AEC.idEmpresa = '$idEmpresa'
            AND YEAR(cp_AEC.Fecha_AperturaVotaciones) = '$Anio'
            AND MONTH(cp_AEC.Fecha_AperturaVotaciones) = '$Mes'
         UNION ALL
         SELECT
            CONCAT('Actos y condiciones Inseguras: ', fdcPlanesDeAccion.Actividad, ', ', fdcPlanesDeAccion.Responsable) AS Etiqueta,
            fdcPlanesDeAccion.FechaEstimadaDeEjecucion AS Fecha,
            fdcPlanesDeAccion.FechaRealDeEjecucion AS Condicion
         FROM
            fdcPlanesDeAccion
         WHERE
            fdcPlanesDeAccion.idEmpresa = '$idEmpresa'
            AND YEAR(fdcPlanesDeAccion.FechaEstimadaDeEjecucion) = '$Anio'
            AND MONTH(fdcPlanesDeAccion.FechaEstimadaDeEjecucion) = '$Mes') D 
         ORDER BY 2;";

   $idx = 0;
   $result = $link->query(utf8_decode($sql));
   while ($row = mysqli_fetch_assoc($result)){
      $Resultado['Calendario'][$idx] = array();
      foreach ($row as $key => $value) {
         $Resultado['Calendario'][$idx][$key] = utf8_encode($value);
      }
      $idx++;
   }


   $Resultado['Alertas'] = array();

   mysqli_free_result($result);  
   echo json_encode($Resultado);
?>