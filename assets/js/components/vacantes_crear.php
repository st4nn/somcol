<?php
   include("../conectar.php"); 

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   
   $datos = json_decode($_POST['datos']);

   if ($datos->id == '') {
      $datos->id = 'NULL';
   }

   $values = '';
   $campos = '';
   $cUpdate = '';

   foreach ($datos as $key => $value) 
   {
      $campos .= $key . ", ";
      $values .= "'" . addslashes($value) . "', ";
      $campos .= $key . "= VALUES(" . $key . "), ";
   }

   $values = substr($values, 0, -2);
   $campos = substr($campos, 0, -2);
   $cUpdate = substr($campos, 0, -2);

   $Respuesta = array();
   $Respuesta['Error'] = "";
   

   $sql = "INSERT INTO vacantes(Usuario, $campos) VALUES  
            (
               '" . $idUsuario . "',
               " . $values . "
            ) ON DUPLICATE KEY UPDATE 
      $cUpdate;";

   $link->query(utf8_decode($sql));

   if ( $link->error <> "")
   {
      $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
   } else
   {
      $nuevoId = $link->insert_id;
      $Respuesta['datos'] = $nuevoId;
   }

   echo json_encode($Respuesta);

?>