function fun_Inicio()
{

  $(document).delegate('.btnCargarMenu', 'click', function(evento) 
  {
    evento.preventDefault();
    $(this).inicio_CargarMenu();
  });

  $('#lblInicio').on('click', function(event){
    event.preventDefault();
    cargarModulo('Inicio.html', 'AUTOGESTIÓN SGS-ST');
  });


  $.post('../server/php/proyecto/Usuarios_Cargar.php', {u: Usuario.id, k : Usuario.hash}, function(data, textStatus, xhr) 
  {
    if (data == 0)
    {
      cerrarSesion();
    } else
    {
      $.extend( Usuario, data);
      localStorage.setItem("mj_somcol", JSON.stringify(Usuario));    
      $(".lblUsuario").text(Usuario.Nombre);

      $.post('../server/php/proyecto/Empresas_Cargar.php', {Usuario: Usuario.id, Parametro : ''}, function(data, textStatus, xhr) 
      {
        Empresa = data[0];
        $.each(data, function(index, val) 
        {
            $(".imgLogoEmpresa").attr("src", '../server/php/' + val.Ruta + '/' + val.Archivo);
            $(".lblEmpresa_Nombre").text(val.Nombre);
            
            $(".lblEmpresa_Direccion").text(val.Direccion);
            $(".lblEmpresa_Telefono").text(val.Telefono);
            $(".lblEmpresa_Responsable").text(val.Correo);

            $("#txtInicio_idEmpresa").val(val.id);

            $('.site-navbar .navbar-container').css('background-color' , '#' + val.colorPrimario);
            $('.cntUbicacionModulo').css('background' , '#' + val.colorSecundario);
        });
      }, 'json');
      
      if (Usuario.idPerfil > 1)
      {
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

function personal_desde_Inicio(){
  $('#btnPersonal_Listado_Volver').cambiarDireccionamiento('Inicio', 'Inicio.html');
  personal_listado_Cargar();
}