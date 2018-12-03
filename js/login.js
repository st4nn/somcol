$(document).on("ready", ready_login);

function ready_login()
{
  $("#btnLogin_Entrar").on("click", frmLogin_submit);
  $("#frmLogin").on("submit", frmLogin_submit);

  const colors = JSON.parse(localStorage.getItem('mj_somcol_colors'));
  if (colors !== null){
    console.log(colors);
    $('body').css('background-color',  `#${colors.p}`);
  }

  /**
   * Fragmento para controlar si la sesión está activa
  **/

  var Usuario = JSON.parse(localStorage.getItem('mj_somcol'));  

  var objDate = 16;
  var sessionFlag = false;
  
  if (Usuario != null)
  {
    var objUser = JSON.parse(localStorage.getItem('mj_somcol'));
    var cDate = new Date();
    var sessionFlag = true;
  
    var pDate = new Date(objUser.cDate);
  
    objDate = cDate - pDate;  
  }

  
  if (Math.round((objDate/1000)/60) < 60 && sessionFlag)
  {
    objUser.cDate = cDate;
    localStorage.setItem("mj_somcol", JSON.stringify(objUser));    
    window.location.replace("aplicacion/index.html");
  } else
  {
    delete localStorage.mj_somcol;    
  }
}
/**
 * Evento que se llama cuando el usuario hace submit para Iniciar Sesión
**/
function frmLogin_submit(event)
{
  event.preventDefault();
  var cDate = new Date();

    var pUsuario = $("#txtLogin_Usuario").val();
    var pClave = md5(md5(md5($("#txtLogin_Clave").val())));

    $.post('server/php/proyecto/validarUsuario.php', {pUsuario: pUsuario, pClave : pClave, pFecha : cDate}, function(data, textStatus, xhr) 
    {
      if (data != 0)
      {
        if (typeof data == "object")
        {
          data.cDate = cDate;
          localStorage.setItem("mj_somcol", JSON.stringify(data));  

          window.location.replace("aplicacion/index.html");
        } else
        {
          $(".alert").html("<strong>Hey!</strong> " + data);
          $(".alert").fadeIn(300).delay(2600).fadeOut(600);
          
        }
      } else
      {
        $(".alert").html("<strong>Error!</strong> Acceso denegado.");
        $(".alert").fadeIn(300).delay(2600).fadeOut(600);
      }
    }, "json");
}