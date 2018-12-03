<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idEncuesta = addslashes($_POST['idEncuesta']);

   $Datos = array();
   $Datos['preguntas'] = array();

   $sql = "SELECT id, Titulo, idTipoPregunta AS Tipo FROM encuestas_preguntas WHERE idEncuesta = $idEncuesta";
   $result = $link->query($sql);

   $idx = 0;

   while ($row = mysqli_fetch_assoc($result)){
      $Datos['preguntas'][$idx] = array();
      $Datos['preguntas'][$idx]['id'] = intval($row['id']);
      $Datos['preguntas'][$idx]['titulo'] = utf8_encode($row['Titulo']);
      $Datos['preguntas'][$idx]['tipo'] = intval($row['Tipo']);

      if ($Datos['preguntas'][$idx]['tipo'] >= 5){
         $idy = 0;
         $Datos['preguntas'][$idx]['opciones'] = array();
         $sql2 = "SELECT id, Titulo FROM encuestas_opciones WHERE idPregunta = " . $row['id'] . ";";
         $result2 = $link->query($sql2);

         while ($row2 = mysqli_fetch_assoc($result2)){
            $Datos['preguntas'][$idx]['opciones'][$idy] = array();
            $Datos['preguntas'][$idx]['opciones'][$idy]['id'] = intval($row2['id']);
            $Datos['preguntas'][$idx]['opciones'][$idy]['titulo'] = utf8_encode($row2['Titulo']);
            $idy++;
         }
      }

      $idx++;
   }

   $sql = "SELECT 
            encuestas_abiertas.id, 
            encuestas_abiertas.fechaCargue, 
            encuestas_respuestas.idPregunta, 
            encuestas_respuestas.Respuesta 
         FROM 
            encuestas_abiertas 
            INNER JOIN encuestas_respuestas 
               ON encuestas_abiertas.id = encuestas_respuestas.idRegistro 
         WHERE 
            encuestas_abiertas.idEncuesta = '$idEncuesta' 
            AND encuestas_abiertas.estado = 1
         ORDER BY 1, 2;";

   $result = $link->query($sql);

   $tmpId = -1;
   $idx = -1;
   $idy = 0;

   while ($row = mysqli_fetch_assoc($result)){
      if ($tmpId <> $row['id']){
         $tmpId = $row['id'];
         $idx++;
         $Datos['respuesta'][$idx] = array();
         $Datos['respuesta'][$idx]['id'] = intval($row['id']);
         $Datos['respuesta'][$idx]['fecha'] = $row['fechaCargue'];
         $Datos['respuesta'][$idx]['respuestas'] = array();
      }

      $Datos['respuesta'][$idx]['respuestas'][$idy] = array();
      $Datos['respuesta'][$idx]['respuestas'][$idy]['id'] = intval($row['idPregunta']);
      $Datos['respuesta'][$idx]['respuestas'][$idy]['respuesta'] = utf8_encode($row['Respuesta']);

      $idy++;
   }

   mysqli_free_result($result);  
   echo json_encode($Datos);
?>