<?php
	include("conectar.php"); 
   $link = Conectar();

   date_default_timezone_set("America/Bogota");

   $fecha = date('Y-m-d H:i:s');
   $nuevafecha = strtotime ( '-5 minute' , strtotime ( $fecha ) ) ;
   $nuevafecha = date('Y-m-d H:i:s', $nuevafecha);
   
   $sql = "DELETE FROM sesion WHERE fecha <= '$nuevafecha';";
   $result = $link->query($sql);

?>