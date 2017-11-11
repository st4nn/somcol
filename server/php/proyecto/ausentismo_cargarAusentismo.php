<?php
  include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Desde = addslashes($_POST['Desde']);
   $Hasta = addslashes($_POST['Hasta']);

   $sql = "SELECT 
               au_registro.*,
               personal.Cedula,
               personal.Nombres,
               personal.Apellidos,
               personal.FechaNacimiento,
               personal.Genero,
               personal.Cargo,
               personal.Grupo,
               personal.Regional,
               personal.NombreEPS,
               confCieX.Descripcion,
               confCieX.Sistema,
               confCieX.Subsistema
            FROM
               au_registro
               INNER JOIN personal ON au_registro.idPersonal = personal.id
               INNER JOIN confCieX ON confCieX.Codigo = au_registro.CodigoDiagnostico;";

   $result = $link->query(utf8_decode($sql));
   $idx=0;
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