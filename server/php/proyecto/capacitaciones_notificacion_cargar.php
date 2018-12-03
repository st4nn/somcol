<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Cedula = addslashes($_POST['cedula']);

   $sql = "SELECT 
               personal.*
            FROM
               personal
            WHERE 
               personal.idEmpresa = '$idEmpresa'
               AND personal.Cedula = '$Cedula';";

   $result = $link->query(utf8_decode($sql));
   $Personal = array();
   $Temas = array();
   if ( $result->num_rows > 0){
      $Cargo = '';
      while ($row = mysqli_fetch_assoc($result)){
         $Cargo =  utf8_encode($row['Cargo']);

         foreach ($row as $key => $value) {
            $Personal[$key] = utf8_encode($value);
         }
      }

      $sql = "SELECT 
                  capacitaciones_Temas.*
               FROM
                  capacitaciones_Temas
                  INNER JOIN capacitaciones_Cargo 
                     ON capacitaciones_Cargo.idTema = capacitaciones_Temas.id
               WHERE 
                  capacitaciones_Temas.idEmpresa = '$idEmpresa'
                  AND capacitaciones_Cargo.cargo = '$Cargo'
               ORDER BY
                  capacitaciones_Temas.Programa,
                  capacitaciones_Temas.Tema;";

      $result = $link->query(utf8_decode($sql));
      $idx = 0;
      if ( $result->num_rows > 0){
         while ($row = mysqli_fetch_assoc($result)){
            $Temas[$idx] = array();
            foreach ($row as $key => $value) {
               $Temas[$idx][$key] = utf8_encode($value);
            }
            $idx++;
         }
      }
   }

   $Resultado = array('personal' => $Personal, 'temas' => $Temas);
   mysqli_free_result($result);  
   echo json_encode($Resultado);
?>