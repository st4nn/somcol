<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $Parametro = addslashes($_POST['Parametro']);
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   if ($Usuario['idPerfil'] > 1){
      $eUsuario = " AND Empresas.id = '" . $Usuario['idEmpresa'] . "'";
   }

   $eParametro = "";
   if ($Parametro != ''){
      $eParametro = $Parametro;
   }  

   if (array_key_exists('idEmpresa', $_POST)){
      $eUsuario = '';
      $eParametro = " AND Empresas.id = '" . addslashes($_POST['idEmpresa']) . "' ";
   }

   $sql = "SELECT
            Empresas.*,
            Archivos.Ruta,
            Archivos.Nombre AS Archivo,
            datosUsuarios.Nombre AS Usuario,
            datosUsuarios.Correo AS uCorreo
          FROM
            Empresas
            INNER JOIN datosUsuarios ON datosUsuarios.idLogin = Empresas.idUsuario
            LEFT JOIN (SELECT Prefijo, MAX(id) AS id FROM Archivos WHERE Proceso = 'empresa_Logo' GROUP BY Prefijo) bArchivos ON bArchivos.Prefijo = Empresas.id
            LEFT JOIN Archivos ON Archivos.id = bArchivos.id
         WHERE
            Empresas.Estado > 0 $eUsuario $eParametro
         GROUP BY
            Empresas.id
         ORDER BY Empresas.Nombre;";
            
   $result = $link->query(utf8_decode($sql));
   $idx = 0;
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