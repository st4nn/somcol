function fun_Inicio(){

  $(document).delegate('.btnCargarMenu', 'click', function(evento) {
    evento.preventDefault();
    $(this).inicio_CargarMenu();
  });

  $('#lblInicio').on('click', function(event){
    event.preventDefault();
    cargarModulo('Inicio.html', 'AUTOGESTIÓN SGS-ST');
  });


  $.post('../server/php/proyecto/Usuarios_Cargar.php', 
    {
      u: Usuario.id, 
      k : Usuario.hash
    }, function(data, textStatus, xhr) {
    if (data == 0)
    {
      cerrarSesion();
    } else
    {
      $.extend( Usuario, data);
      localStorage.setItem("mj_somcol", JSON.stringify(Usuario));    
      $(".lblUsuario").text(Usuario.Nombre);

      $.post('../server/php/proyecto/Empresas_Cargar.php', {Usuario: Usuario.id, Parametro : '', idEmpresa : Usuario.idEmpresa}, function(data, textStatus, xhr) 
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
            $('.cntHomeButtons .fIniButton i').css('background-color' , '#' + val.colorPrimario);
            $('.cntUbicacionModulo').css('background' , '#' + val.colorSecundario);

            localStorage.setItem('mj_somcol_colors', JSON.stringify({
              p : val.colorPrimario,
              s : val.colorSecundario
            }));

            inicio_CargarDashboard();
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

  $.fn.ajustarFormularioGoogle = function(){
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

  $(document).delegate('.fillPrintTextarea', 'change', function(){
        const _id = '#print' + $(this).attr('id');
        $(_id).html($(this).val().replace(/\n/gi, '<br>'));
    });
}

function personal_desde_Inicio(){
  $('#btnPersonal_Listado_Volver').cambiarDireccionamiento('Inicio', 'Inicio.html', "inicio_CargarDashboard");
  personal_listado_Cargar();
}

function inicio_CargarDashboard(){

  $('#cntInicio_GraficasPersonal div').remove();
  $('#cntInicio_Eventos div').remove();
  $('#cntInicio_Alertas div').remove();
  $.post('../server/php/proyecto/inicio_CargarDashboard.php', {idEmpresa: $('#txtInicio_idEmpresa').val()}, 
  function(data, textStatus, xhr) {
    var tds = '';
    $.each(data.Personal, function(index, val) {
      const _percent = parseInt(parseInt(val, 10) * 100/data.PersonalTotal, 10);
       tds += `<div class="contextual-progress">
          <div class="clearfix">
            <div class="progress-title">${index}</div>
            <div class="progress-label">${_percent}%</div>
          </div>
          <div class="progress" data-goal="${_percent}" data-plugin="progress">
            <div class="progress-bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${_percent}" style="width: ${_percent}%" role="progressbar">
              <span class="progress-label"></span>
            </div>
          </div>
        </div>`;
    });
    $('#cntInicio_GraficasPersonal').append(tds);
    $('#txtInicio_PersonalTotal').text(data.PersonalTotal);

    if (data.Calendario.length === 0){
      tds = `<div><h1>No hay eventos programados este mes <i class="icon fas fa-calendar-o"></i></h1></div>`;
    } else{
      tds = '';
      $.each(data.Calendario, function(index, val) {
        let _status = 'warning';
        if (val.Condicion !== '0000-00-00'){
          _status = 'success';
        } else{
          const _d = new Date(val.Fecha.split('-'));
          const _currentDate = new Date();
          if (_d < _currentDate){
            _status = 'danger';
          }
        }
        tds += `<div>
                  <span class="${_status}">${val.Fecha}</span>
                  <p>${val.Etiqueta}</p>
                </div>`;
      });
    }
    $('#cntInicio_Eventos').append(tds);

    if (data.Alertas.length === 0){
      tds = `<div><h1>No hay ninguna alerta por revisar <i class="icon fas fa-smile-o"></i></h1></div>`;
    } else{
      tds = '';
      $.each(data.Alertas, function(index, val) {
      });
    }

    $('#cntInicio_Alertas').append(tds);
  }, 'json');
}