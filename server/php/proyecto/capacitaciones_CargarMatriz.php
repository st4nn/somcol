<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);

   $sql = "SELECT 
               DISTINCT personal.Cargo
            FROM
               personal
            WHERE 
               personal.idEmpresa = '$idEmpresa';";

   $result = $link->query(utf8_decode($sql));
   $Personal = array();
   if ( $result->num_rows > 0){
      while ($row = mysqli_fetch_assoc($result)){
         array_push($Personal, utf8_encode($row['Cargo']));
      }
   }

   $sql = "SELECT 
               capacitaciones_Temas.*
            FROM
               capacitaciones_Temas
            WHERE 
               capacitaciones_Temas.idEmpresa = '$idEmpresa'
            ORDER BY
               capacitaciones_Temas.Programa,
               capacitaciones_Temas.Tema;";
   $result = $link->query(utf8_decode($sql));
   $Temas = array();
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

   $sql = "SELECT 
               capacitaciones_Cargo.Cargo,
               capacitaciones_Cargo.idTema
            FROM
               capacitaciones_Cargo
               INNER JOIN capacitaciones_Temas
                  ON capacitaciones_Cargo.idTema = capacitaciones_Temas.id
            WHERE 
               capacitaciones_Temas.idEmpresa = '$idEmpresa';";
   
   $result = $link->query(utf8_decode($sql));
   $Asignaciones = array();

   if ( $result->num_rows > 0){
      while ($row = mysqli_fetch_assoc($result)){
         if (!isset($Asignaciones[$row['idTema']])){
            $Asignaciones[$row['idTema']] = array();
         }
         array_push($Asignaciones[$row['idTema']], utf8_encode($row['Cargo']));
      }
   }

   $Resultado = array('personal' => $Personal, 'temas' => $Temas, 'asignaciones' => $Asignaciones);
   mysqli_free_result($result);  
   echo json_encode($Resultado);
?>