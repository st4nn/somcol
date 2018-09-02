<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Anio = addslashes($_POST['Anio']);

   $Temas = array();

   $sql = "SELECT 
               capacitaciones_Temas.*,
               capacitaciones_Temas_Responsable.Responsable
            FROM
               capacitaciones_Temas
               LEFT JOIN capacitaciones_Temas_Responsable
                  ON capacitaciones_Temas_Responsable.idTema = capacitaciones_Temas.id
                  AND capacitaciones_Temas_Responsable.Anio = '$Anio'
            WHERE 
               capacitaciones_Temas.idEmpresa = '$idEmpresa';";

   $result = $link->query(utf8_decode($sql));
   $idx=0;
   if ( $result->num_rows > 0){
      while ($row = mysqli_fetch_assoc($result)){
         $Temas[$idx] = array();
         foreach ($row as $key => $value) {
            $Temas[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
   }


   $Programadas = array();

   $sql = "SELECT 
               capacitaciones_Temas.id,
               capacitaciones_Temas_Programacion.Semana,
               capacitaciones_Temas_Programacion.Mes
            FROM
               capacitaciones_Temas_Programacion
               INNER JOIN capacitaciones_Temas
                  ON capacitaciones_Temas_Programacion.idTema = capacitaciones_Temas.id
            WHERE 
               capacitaciones_Temas.idEmpresa = '$idEmpresa'
               AND capacitaciones_Temas_Programacion.Anio = '$Anio';";

   $result = $link->query(utf8_decode($sql));
   $idx=0;
   if ( $result->num_rows > 0){
      while ($row = mysqli_fetch_assoc($result)){
         $Programadas[$idx] = array();
         foreach ($row as $key => $value) {
            $Programadas[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
   }




   $Resultado = array('temas' => $Temas, 'programadas' => $Programadas);
   mysqli_free_result($result);  
   echo json_encode($Resultado);
?>