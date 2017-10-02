function fun_Inicio()
{

  $(document).delegate('.btnCargarMenu', 'click', function(evento) 
  {
    evento.preventDefault();
    $(this).inicio_CargarMenu();
  });

  $.post('../server/php/proyecto/Usuarios_Cargar.php', {u: Usuario.id, k : Usuario.hash}, function(data, textStatus, xhr) 
  {
    if (data == 0)
    {
      cerrarSesion();
    } else
    {
      $.extend( Usuario, data);
      localStorage.setItem("ls_sisof", JSON.stringify(Usuario));    

      if (Usuario.idPerfil > 1)
      {
        $.post('../server/php/proyecto/Empresas_Cargar.php', {Usuario: Usuario.id, Parametro : ''}, function(data, textStatus, xhr) 
        {
          $.each(data, function(index, val) 
          {
              $(".imgLogoEmpresa").attr("src", '../server/php/' + val.Ruta + '/' + val.Archivo);
              $(".lblEmpresa_Nombre").text(val.Nombre);
              
              $(".lblEmpresa_Direccion").text(val.Direccion);
              $(".lblEmpresa_Telefono").text(val.Telefono);
              $(".lblEmpresa_Responsable").text(val.Correo);

              $("#txtInicio_idEmpresa").val(val.id);
          });
        }, 'json');
      }
    }
  }, 'json');

  

  $.fn.inicio_CargarMenu = function()
  {
    var Vinculo = $(this).attr("data-sitio");

    $("#contenedorMenu ul").remove();
    $.get('menus/' + Vinculo + ".html?tmpId=" + obtenerPrefijo(), function(data) 
    {
      $("#contenedorMenu").append(data);
      if ($(window).width() < 767)
          {
            $.site.menubar.open();
          } else
          {
            $.site.menubar.unfold();
          }
    }).fail(function() {
      Mensaje("Error", "No tiene permisos para acceder a este modulo", "danger");
    });
    $("#contenedorMenu ul").remove();
  }

  $(document).delegate('.input-search-close', 'click', function(event) 
  {
    var control = $(this).parent('.input-search').find('input[type="text"]');
    $(control).val('');
  });

  $(document).delegate('.buscarGoogle', 'submit', function(event) 
  {
    event.preventDefault();

    $(this).ajustarFormularioGoogle();
  });

  $.fn.ajustarFormularioGoogle = function()
  {
    $(this).css('margin-top', '0px');
    $(this).css('width', '100%');
    $(this).find(".buscarGoogle_titulo").remove();

    var objetos = $(this).find('.buscarGoogle_col');
    var botones = $(objetos).find("button");

    $(objetos).removeClass('col-sm-12');
    $(objetos).addClass('col-lg-6');

    $(botones).removeClass('margin-10');
    $(botones).addClass('margin-horizontal-5');

    $(this).find(".buscarGoogle_col_del").remove();

    $(this).removeClass('buscarGoogle');
  }
}