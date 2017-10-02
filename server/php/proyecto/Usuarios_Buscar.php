<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $Parametro = addslashes($_POST['Parametro']);
   
   $sql = "SELECT
            datosUsuarios.*,
            Login.idEmpresa,
            Login.Usuario,
            Login.Estado,
            Empresas.Nombre AS 'Empresa',
            Perfiles.Nombre AS 'Perfil'
          FROM
            datosUsuarios
            INNER JOIN Login ON datosUsuarios.idLogin = Login.idLogin
            INNER JOIN Empresas ON Empresas.id = Login.idEmpresa
            INNER JOIN Perfiles ON Perfiles.idPerfil = datosUsuarios.idPerfil
         WHERE
            datosUsuarios.Nombre LIKE '%$Parametro%'
            OR datosUsuarios.Correo LIKE '%$Parametro%'
            OR datosUsuarios.Cargo LIKE '%$Parametro%'
            OR Empresas.Nombre LIKE '%$Parametro%'
            OR Perfiles.Nombre  LIKE '%$Parametro%';";
            
   $result = $link->query($sql);
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