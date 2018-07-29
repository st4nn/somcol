<?php
	include("../../server/php/conectar.php"); 
   $link = Conectar();

   date_default_timezone_set("America/Bogota");

   $Candidato = addslashes($_POST['idCandidato']);
   $Cedula = addslashes($_POST['cedula']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Anio = addslashes($_POST['Anio']);
   
   $sql = "SELECT 
            * 
           FROM 
            cp_AEC  
          WHERE
            idEmpresa = '$idEmpresa'
            AND Anio = '$Anio'";

   $result = $link->query($sql);
   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   $fecha = strtotime (date('Y-m-d H:i:s'));
   
   $fechaIni = strtotime ($fila['Fecha_AperturaVotaciones'] . ' 00:00:00');
   $fechaFin = strtotime ($fila['Fecha_CierreVotaciones'] . ' 23:59:59');
   
   if ($fecha > $fechaIni)
   {
      if ($fecha < $fechaFin)
      {
        $sql = "SELECT * FROM cp_votos WHERE Cedula = '$Cedula' AND Anio = '$Anio';";
        $result = $link->query($sql);

        if ($result->num_rows > 0){
          echo "Tu voto ya estaba registrado, solo puedes votar una vez, gracias por participar";
        } else{
           $sql = "INSERT INTO cp_votos (idCandidato, Cedula, Anio) VALUES ('$Candidato', '$Cedula', '$Anio');";
           $result = $link->query($sql);

           if ( $link->affected_rows > 0){
              echo "Tu voto ha sido registrado, gracias por participar";
              $sql = "SELECT COUNT(*) AS Votos FROM cp_votos WHERE idCandidato = '$Candidato';";
              $result = $link->query($sql);
              $fila =  $result->fetch_array(MYSQLI_ASSOC);

              $sql = "UPDATE cp_AEC_Candidatos SET Votos = " . $fila['Votos'] . " WHERE id = '" . $Candidato . "';";
              $result = $link->query($sql);
           } else
           {
              echo "Hubo un problema con tu voto, por favor intenta mas tarde";
           }
        }
      } else{
        echo "Ya se ha cerrado la votación";
      }
   } else{
      echo "Aún no está abierta la votación";
   }
    
?>