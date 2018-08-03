<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);
   $id = addslashes($_POST['Prefijo']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   $TipoEvento = addslashes($_POST['TipoEvento']);
   $IncapacidadTipo = addslashes($_POST['IncapacidadTipo']);
   $FechaInicial = addslashes($_POST['FechaInicial']);
   $FechaFinal = addslashes($_POST['FechaFinal']);
   $CodigoDiagnostico = addslashes($_POST['CodigoDiagnostico']);
   $Observaciones = addslashes($_POST['Observaciones']);
   $idPersonal = addslashes($_POST['idPersonal']);
   $Edad = addslashes($_POST['Edad']);

   $RangoDeEdad = calcularRango($Edad);
   $datetime1 = new DateTime($FechaInicial);
   $datetime2 = new DateTime($FechaFinal);
   $interval = $datetime1->diff($datetime2);

   $DiasDeIncapacidad = $interval->format('%d');
   $Dia = substr($FechaInicial, 8, 2);
   $Mes = substr($FechaInicial, 5, 2);
   $Anio = substr($FechaInicial, 0, 4);
   $Trimestre = calcularTrimestre($Mes);

   $arrDiasDeLaSemana = $arrayName = array(
      0 => 'Domingo',
      1 => 'Lunes',
      2 => 'Martes',
      3 => 'Miercoles',
      4 => 'Jueves',
      5 => 'Viernes',
      6 => 'Sabado'); 
   
   $DiaDeLaSemana = $arrDiasDeLaSemana[date('w', strtotime($FechaInicial))];

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL" OR $id == "0")
   {
      $id = "NULL";
   }

      $sql = "INSERT INTO au_registro(id, Prefijo, idEmpresa, idUsuario, idPersonal, Edad, TipoEvento, IncapacidadTipo, FechaInicial, FechaFinal, CodigoDiagnostico, Observaciones, RangoDeEdad, DiasDeIncapacidad, Dia, Mes, Anio, DiaDeLaSemana, Trimestre) VALUES 
      (
         $id, 
         '" . $idEmpresa . "',
         '" . $Prefijo . "',
         '" . $idUsuario . "',
         '" . $idPersonal . "',
         '" . $Edad . "',
         '" . $TipoEvento . "',
         '" . $IncapacidadTipo . "',
         '" . $FechaInicial . "',
         '" . $FechaFinal . "',
         '" . $CodigoDiagnostico . "',
         '" . $Observaciones . "',
         '" . $RangoDeEdad . "',
         '" . $DiasDeIncapacidad . "',
         '" . $Dia . "',
         '" . $Mes . "',
         '" . $Anio . "',
         '" . $DiaDeLaSemana . "',
         '" . $Trimestre . "'
      ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      idPersonal = VALUES(idPersonal),
      Edad = VALUES(Edad),
      TipoEvento = VALUES(TipoEvento),
      IncapacidadTipo = VALUES(IncapacidadTipo),
      FechaInicial = VALUES(FechaInicial),
      FechaFinal = VALUES(FechaFinal),
      CodigoDiagnostico = VALUES(CodigoDiagnostico),
      Observaciones = VALUES(Observaciones),
      RangoDeEdad = VALUES(RangoDeEdad),
      DiasDeIncapacidad = VALUES(DiasDeIncapacidad),
      Dia = VALUES(Dia),
      Mes = VALUES(Mes),
      Anio = VALUES(Anio),
      DiaDeLaSemana = VALUES(DiaDeLaSemana),
      Trimestre = VALUES(Trimestre),
      fechaCargue = '" . date('Y-m-d H:i:s') . "';";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         if ($id == 'NULL')
         {
            echo $link->insert_id;
         } else
         {
            echo $id;
         }
      } else
      {
         echo $link->error;
      }

      function calcularRango($Edad){
         if ($Edad < 18){
            return 'Menor a 18 años';
         } else {
            if ($Edad < 25){
               return '18 a 25';               
            } else{
               if ($Edad < 30){
                  return '25 a 30';                  
               } else{
                  if ($Edad < 35){
                     return '30 a 35';
                  } else{
                     if ($Edad < 40){
                        return '35 a 40';
                     } else{
                        if ($Edad < 45){
                           return '40 a 45';
                        } else{
                           if ($Edad < 50){
                              return '45 a 50';
                           } else{
                              if ($Edad < 55){
                                 return '50 a 55';
                              } else{
                                 if ($Edad < 60){
                                    return '55 a 60';
                                 } else{
                                    return 'Mayor a 60';
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }

   function calcularTrimestre($mes){
      $mes = intval($mes);
      if ($mes < 4){
         return '1er';
      } else {
         if ($mes < 7){
            return '2do';
         } else{
            if ($mes < 10){
               return '3er';
            } else{
               return '4to';
            }
         }
      }
   }
   
?> 