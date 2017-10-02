<?php
   include("../conectar.php"); 
   error_reporting(0);
   $link = Conectar();

   date_default_timezone_set('America/Bogota');

   $usuario = addslashes($_POST['u']);
   $clave = addslashes($_POST['k']);
   
   $sql = "SELECT 
               Login.idLogin AS 'id',
               Login.Usuario AS 'Usuario',
               md5(Login.Clave) AS 'hash',
               Login.Estado AS 'Estado',
               Datos.Nombre AS 'Nombre',
               Datos.Correo AS 'Correo',
               Datos.Cargo AS 'Cargo',
               Datos.idPerfil AS 'idPerfil',
               Login.idEmpresa AS 'idEmpresa',
               Empresas.Nombre AS 'Empresa'
            FROM 
               Login AS Login
               INNER JOIN Empresas ON Login.idEmpresa = Empresas.id
               INNER JOIN datosUsuarios AS Datos ON Login.idLogin = Datos.idLogin
            WHERE 
               Login.idLogin = '$usuario' 
               AND md5(Login.Clave) = '" . $clave . "'
               AND Empresas.Estado = 1
               AND Login.Estado = 'Activo';";

   $result = $link->query($sql);

   if ( $result->num_rows == 1)
   {
      $idx = 0;
      
         $Resultado = array();
         while ($row = mysqli_fetch_assoc($result))
         {
            foreach ($row as $key => $value) 
            {
               $Resultado[$key] = utf8_encode($value);
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