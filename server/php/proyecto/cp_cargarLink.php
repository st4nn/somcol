<?php
   $Anio = addslashes($_POST['Anio']);
   $idEmpresa = addslashes($_POST['idEmpresa']);

   echo 'e=' . $idEmpresa . '&a=' . $Anio . '&p=' . md5(md5($idEmpresa));
?>