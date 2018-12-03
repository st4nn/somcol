<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   $idEmpresa = addslashes($_POST['idEmpresa']);
   $hash = addslashes($_POST['hash']);

   $sql = "SELECT 
               id,
               Titulo
            FROM 
               encuestas
            WHERE
               idEmpresa = '$idEmpresa'
               AND hash = '$hash'";

   $result = $link->query($sql);
   $idx = 0;

   $id = 0;
   $titulo = '';

   while ($row = mysqli_fetch_assoc($result)){
      $titulo = utf8_encode($row['Titulo']);
      $id = $row['id'];
   }

   if ( $result->num_rows > 0){
      $Datos = array();
      $Datos['id'] = $id;
      $Datos['titulo'] = $titulo;
      $Datos['preguntas'] = array();

      $sql = "SELECT id, Titulo, idTipoPregunta FROM encuestas_preguntas WHERE idEncuesta = $id";
      $result = $link->query($sql);

      while ($row = mysqli_fetch_assoc($result)){
         $Datos['preguntas'][$idx] = array();
         $Datos['preguntas'][$idx]['id'] = intval($row['id']);
         $Datos['preguntas'][$idx]['titulo'] = utf8_encode($row['Titulo']);
         $Datos['preguntas'][$idx]['tipo'] = intval($row['idTipoPregunta']);

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

      $sql = "INSERT INTO encuestas_abiertas (idEncuesta, idEmpresa) VALUES (
         '$id',
         '$idEmpresa'
      );";

      $link->query(utf8_decode($sql));
      $Datos['idRegistro'] = $link->insert_id;

      mysqli_free_result($result);  
      echo json_encode($Datos);
   } else
   {
      echo 0;
   }
?>