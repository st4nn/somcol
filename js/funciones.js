var Usuario = null;
var Empresa = null;
var usuarioPermisos = null;

$(document).ready(function() {
	aplicacion();
  Usuario = JSON.parse(localStorage.getItem('mj_somcol'));

  if (Usuario == null || Usuario == undefined)
  {
    cerrarSesion();
  } else
  {
    //llenarRestricciones();
    cargarModulo("Inicio.html", "Inicio", function()
      {
        $(".lblUsuario").text(Usuario.Nombre);
        $("#txtInicio_idEmpresa").val(Usuario.idEmpresa);
      });
  }

  document.addEventListener("backbutton", function(e)
    { 
          e.preventDefault(); 
    }, false);
});

function aplicacion()
{
  $("#lblCerrarSesion").on("click", cerrarSesion);
    
	$(document).delegate(".lnkMenuBar_Item", "click", function(evento)
    {
      evento.preventDefault();
      var titulo = $(this).find('span').text();
      var vinculo = $(this).attr("vinculo");

      if (vinculo != undefined)
      {
       	cargarModulo(vinculo, titulo);
        if ($(window).width() < 767)
          {
            $.site.menubar.hide();
          } else
          {
            $.site.menubar.fold();
          }
      }
    });
}

function cargarModulo(vinculo, titulo, callback)
{
	$("#txtCrearProyecto_idProyecto").val("");
  
  titulo = titulo || null;

  if (callback === undefined)
    {callback = function(){};}


	$(".Modulo").hide();
        var tds = "";
        var nomModulo = "modulo_" + vinculo.replace(/\s/g, "_");
        nomModulo = nomModulo.replace(/\./g, "_");
        nomModulo = nomModulo.replace(/\//g, "_");

        if ($('#' + nomModulo).length)
        {
          $('#' + nomModulo).show();
          callback();
        } else
        {
          tds += '<div id="' + nomModulo + '" class="Modulo"></div>';

          $("#contenedorDeModulos").append(tds);
          $.get(vinculo + "?tmpId=" + obtenerPrefijo(), function(data) 
          {
            $("#" + nomModulo).html(data);
            callback();
          }).fail(function() {
            Mensaje("Error", "No tiene permisos para acceder a este modulo", "danger");
          });
        }
        $("#lblUbicacionModulo").text(titulo);
}
$.fn.generarDatosEnvio = function(restricciones, callback)
{
  if (callback === undefined)
    {callback = function(){};}

    var obj = $(this).find(".guardar");
  var datos = {};
  datos['Usuario'] = Usuario.id;

  $.each(obj, function(index, val) 
  {
    if ($(val).attr("id") != undefined)
    {
      if (!$(val).hasClass('tt-hint'))
      {
        datos[$(val).attr("id").replace(restricciones, "")] = $(val).val();
      }
    }
  });
  datos = JSON.stringify(datos);  

  callback(datos);
}
function Mensaje(Titulo, Mensaje, Tipo)
{
  /*
  if (Tipo == undefined)
  {
    Tipo = "success";
  }
  switch (Tipo)
  {
    case "success":
        alertify.success(Mensaje);
      break;
    case "danger":
        alertify.error(Mensaje);
      break;
    default:
        alertify.log(Mensaje);
  }*/
  if (Tipo == "danger")
  {
    Tipo = 'warning';
  } 
  swal({

          title: Titulo,
          text: Mensaje,
          type: Tipo,
          showCancelButton: true,
          cancelButtonText : 'Cancelar'
  }); 
}

function cerrarSesion()
{
  delete localStorage.mj_somcol;
  window.location.replace("../index.html");
}
function abrirURL(url)
{
  var win = window.open(url, "_blank", "directories=no, location=no, menubar=no, resizable=yes, scrollbars=yes, statusbar=no, tittlebar=no");
  win.focus();
}
function obtenerFecha()
{
  var f = new Date();
  return f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 2);
}
function obtenerPrefijo()
{
  var f = new Date();
  return f.getFullYear() + CompletarConCero(f.getMonth() +1, 2) + CompletarConCero(f.getDate(), 2) + CompletarConCero(f.getHours(), 2) + CompletarConCero(f.getMinutes(), 2) + CompletarConCero(f.getSeconds(), 2) + CompletarConCero(Usuario.id, 3);
}
function CompletarConCero(n, length)
{
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}
function llenarRestricciones()
{
  usuarioPermisos = {};
  $.post('../server/php/proyecto/configuracion_CargarRestricciones.php', {Usuario : Usuario.id}, function(data, textStatus, xhr) 
  {
    if (data != 0)
    {
      usuarioPermisos = data;
    }
    controlarPermisos();
  }, 'json');
}

function controlarPermisos()
{
  $.each(usuarioPermisos, function(index, val) 
  {
     $(val.control).hide();
  });
}

function calcularTiempoPublicacion(fecha)
{
    fecha = new Date(fecha.replace(" ", "T") + "Z");
    var fechaActual = new Date();
    
    var tiempo = fecha.getTime();
    var tiempoActual = fechaActual.getTime();

    var diferencia = tiempoActual-tiempo;

    diferencia = parseInt(((diferencia/1000)/60)-300);

    var respuesta = "";
    if (diferencia < 2)
    {
      respuesta = "hace un momento";
    } else
    {
      if (diferencia < 60)
      {
        respuesta = "hace " + diferencia + " minutos";
      } else
      {
          if (diferencia < 120)
          {
            respuesta = "hace " + 1 + " hora";
          } else
          {
            if (diferencia < 1440)
            {
              respuesta = "hace " + parseInt(diferencia/60) + " horas";
            } else
            {
              if (diferencia < 43200)
              {
                respuesta = "hace " + parseInt(diferencia/60/24) + " dias";
              } else
              {
                respuesta = "hace " + parseInt(diferencia/60/24/30) + " meses";
              }
            }
          }
      }
    }

    return respuesta;
}

$.fn.crearDataTable = function(tds, callback, responsive)
{
  responsive = responsive || true;
  if (callback === undefined)
    {callback = function(){};}

  var dtSpanish = {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Filtrar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
  };

  var options = {
        "aoColumnDefs": [{
          'bSortable': false,
          'aTargets': [-1]
        }],
        "iDisplayLength": 10,
        "aLengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "Todos"]
        ],
        responsive: responsive,
        "sDom": 'lBfrtip',
        buttons: [
        'copy', 'excel', 'pdf'
        ],
        "language" : dtSpanish
      };

  var idObj = $(this).attr("id");
  if ($("#" + idObj + "_wrapper").length == 1)
    {
        $(this).dataTable().fnDestroy();
    } 

    if (tds != undefined && tds != "")
    {
      $(this).find("tbody").find("tr").remove();
      $("#" + idObj + " tbody").append(tds);
    }

  $(this).DataTable(options);
  
  callback();
}

$.fn.destruirDataTable = function()
{
  var idObj = $(this).attr("id");
  if ($("#" + idObj + "_wrapper").length == 1)
    {
        $(this).dataTable().fnDestroy();
    }
  $(this).find("tbody").find("tr").remove();
}

$.fn.iniciarObjArchivos = function(parametros)
{
  var idObj = $(this).attr("id").replace("cnt", "");
  var tds = "";
  
    tds += '<div id="cnt' + idObj + '_DivArchivo" class="col-md-12 form-group">';
      tds += '<div class="input-group input-group-file">';
        tds += '<span class="input-group-btn">';
            tds += '<span class="btn btn-success col-md-12 btn-file">';
              tds += '<i class="icon wb-upload" aria-hidden="true"></i>';
              tds += 'Agregar Archivos';
              tds += '<input id="txt' + idObj + '_Archivo" type="file" name="...">';
            tds += '</span>'; 
        tds += '</span>';
      tds += '</div>';
    tds += '</div>';
    tds += '<div class="row">';
            tds += '<h4>Archivos Cargados</h4>';
        tds += '<div class="margin-top-20">';
            tds += '<div id="cnt' + idObj + '_DivArchivo_Listado" class="list-group-dividered list-group-full">';
            tds += '</div>';
        tds += '</div>';
    tds += '</div>';

    $(this).append(tds);
    tds = "";

    if ($("#cntModal_Archivos").length == 0)
  {
      tds += '<div class="modal fade" id="cntModal_Archivos" tabindex="-1" role="dialog" aria-hidden="true">';
            tds += '<div class="modal-dialog">';
                tds += '<div class="modal-content">';
                    tds += '<form id="frmModal_Archivo" class="form-horizontal" role="form">';
                        tds += '<div class="modal-header">';
                            tds += '<h4 class="modal-title">Guardar Archivo <span id="lblModal_Archivo_Nombre"></span></h4>';
                        tds += '</div>';
                        tds += '<div class="modal-body">';
                            tds += '<div class="form-group">';
                                tds += '<div class="fg-line">';
                                    tds += '<textarea id="txtModal_ArchivoDescripcion" class="form-control" rows="5" placeholder="Observaciones, Comentarios o Descripción del Archivo..."></textarea>';
                                tds += '</div>';
                            tds += '</div>';
                        tds += '</div>';
                        tds += '<div class="modal-footer">';
                            tds += '<button type="button" id="btnModal_Archivo_Cancelar" data-dismiss="modal" class="btn btn-warning">Cancelar</button>';
                            tds += '<button type="submit" class="btn btn-success">Enviar</button>';
                        tds += '</div>';
                    tds += '</form>';
                tds += '</div>';
            tds += '</div>';
        tds += '</div>';

        $("body").append(tds);

         $("#btnModal_Archivo_Cancelar").on("click", function(evento)
        {
          evento.preventDefault();
          $("#cntIngresar_Archivo").modal("hide");
        });

      $('#txt' + idObj + '_Archivo').on("change", function(event)
      {
        $("#txtModal_ArchivoDescripcion").val("");
        $("#cntModal_Archivos").modal("show");
        $("#lblModal_Archivo_Nombre").text($(this).val().replace("C:\\fakepath\\", ""));
        $("#txtModal_ArchivoDescripcion").focus();

        files = event.target.files;
      });

      $("#frmModal_Archivo").on("submit", function(evento)
      {
        evento.preventDefault();
        $("#cntModal_Archivos").modal("hide");

        var data = new FormData();

        $.each(files, function(key, value)
        {
            data.append(key, value);
        });

        parametros.Prefijo = $(parametros.objPrefijo).val();

        if (parametros != undefined && parametros != null)
        {
          $.each(parametros, function(index, val) 
          {
            if (index != 'objPrefijo')
            {
              data.append(index, val);
            }
          });
        }


        data.append("Observaciones", $("#txtModal_ArchivoDescripcion").val());
        var nomArchivo = files[0].name;

        $.ajax({
              url: '../server/php/subirArchivos.php',
              type: 'POST',
              data: data,
              cache: false,
              dataType: 'html',
              processData: false, // Don't process the files
              contentType: false, // Set content type to false as jQuery will tell the server its a query string request
              success: function(data, textStatus, jqXHR)
              {
                  if( parseInt(data) >= 1)
                  {
                    var extension = nomArchivo.split('.');
                    if (extension.length > 0)
                    {
                      extension = extension[extension.length - 1];
                    } else
                    {
                      extension = "obj";
                    }

                    var tds = "";
                    tds += '<li class="list-group-item">';
                      tds += '<small>';
                        tds += '<time class="pull-right" datetime="' + obtenerFecha() + '">Hace un momento</time><br>';
                      tds += '</small>';
                      tds += '<p><a class="hightlight" href="../server/php/Archivos/' + parametros.Prefijo + '/' + nomArchivo + '" target="_blank">' + nomArchivo + '</a></p>';
                      tds += '<p>' + $("#txtModal_ArchivoDescripcion").val() + '</p>';
                      tds += '<small>Cargado por ';
                        tds += '<a class="hightlight" href="javascript:void(0)">';
                          tds += '<span> ' + Usuario.Nombre + '</span>';
                        tds += '</a>';
                      tds += '</small>';
                    tds += '</li>';
                    
                    $('#cnt' + idObj + '_DivArchivo_Listado').prepend(tds);
                  }
                  else
                  {
                      Mensaje('Error:', data);
                  }
              },
              error: function(jqXHR, textStatus, errorThrown)
              {
                  // Handle errors here
                  Mensaje('Error:', textStatus);
                  $("#cntIngresar_Archivo").modal("show");
              }
          });
      });
    }
}


function sumarDias(tFecha, tiempo)
{
    var fecha = new Date(tFecha.substring(0, 4), parseInt(tFecha.substring(5, 7)) - 1, tFecha.substring(8, 10));

        dia = fecha.getDate(),
        mes = fecha.getMonth() + 1,
        anio = fecha.getFullYear(),
        addTime = tiempo * 86400; //Tiempo en segundos
 
    fecha.setSeconds(addTime); //Añado el tiempo
 
    
    return fecha.getFullYear() + "-" + CompletarConCero(fecha.getMonth() + 1, 2) + '-' + fecha.getDate();
}

$.fn.iniciar_CargadorImagenes = function(vdefault)
{
  var parametros = {
    idObj : obtenerPrefijo(),
    txtBtn : 'Buscar',
    callback :  function(){}
  };

  $.extend(parametros, vdefault);

  var tds = '';
  tds += '<div class="input-group input-group-file">';
    tds += '<input id="txt' + parametros.idObj + '_Etiqueta" type="text" class="form-control inputText" readonly="">';
    tds += '<span class="input-group-btn">';
      tds += '<span class="btn btn-primary btn-file">';
        tds += '<i class="icon wb-more-horizontal" aria-hidden="true"></i>';
        tds += parametros.txtBtn;
        tds += '<input type="file" id="txt' + parametros.idObj + '_Archivo" class="inputControl" name="txt' + parametros.idObj + '_Archivo">';
      tds += '</span>';
    tds += '</span>';
  tds += '</div>';
  tds += '<div class="col-sm-12">';
    tds += '<br>';
    tds += '<img id="img' + parametros.idObj + '_Preview" class="col-xs-12" height="auto" src="" alt="">';
  tds += '</div>';

  $(this).append(tds);

  $('#txt' + parametros.idObj + '_Archivo').on("change", function(evento)
  {
    $('#img' + parametros.idObj + '_Preview').previewIMG(this, $('#txt' + parametros.idObj + '_Etiqueta'));
    files = evento.target.files;
  });
}

$.fn.previewIMG = function(input, texto)
{
  var obj = this;
    
  if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          if (e.target.result.includes('image'))
          {
            $(obj).attr('src', e.target.result);  
            if (texto != undefined)
            {
              $(texto).val($(input).val().replace('C:\\fakepath\\', ''))
            }
          } else
          {
            Mensaje("Error", "El Archivo seleccionado no es una imagen", "danger");
            $(input).val('');
            $(texto).val('');
            $(obj).attr('src', '');  
          }
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).delegate('.lnkAbrirModulo', 'click', function()
{
  var Vinculo = $(this).attr("Vinculo");
  var Titulo = $(this).attr("Titulo");
  var fCallback = $(this).attr("data-callback");



  cargarModulo(Vinculo, Titulo, function()
    {
      if (fCallback !== undefined && fCallback != null && fCallback != "")
      {
        fCallback = eval(fCallback);

        if (typeof fCallback === "function") 
        {
          fCallback();
        }
      }
    });
});

$.fn.cargarArchivos = function(parametros)
{
  var contenedor = $(this).find(".list-group-full");
  $(contenedor).find("li").remove();
  $.post("../server/php/proyecto/archivos_cargarPorPrefijo.php", parametros, function(data, textStatus, xhr) 
  {
    var tds = '';
    if (data != 0)
    {
      $.each(data, function(index, val) 
      {
        tds += '<li class="list-group-item">';
          tds += '<small><time class="pull-right" datetime="' + val.FechaCargue + '">' + calcularTiempoPublicacion(val.FechaCargue) + '</time></small>';
          tds += '<p><a class="hightlight" href="../server/Archivos/' + val.Ruta + '/' + val.Nombre + '" target="_blank">' + val.Nombre + '</a></p>';
          tds += '<p><small>' + val.Proceso + '</small><br>';
          tds += val.Observaciones + '</p>';
          tds += '<small>Cargado por';
            tds += '<a class="hightlight" href="javascript:void(0)">';
              tds += '<span>' + val.Usuario + '</span>';
            tds += '</a>';
          tds += '</small>';
        tds += '</li>';
      });
    }

    $(contenedor).append(tds);

  }, 'json');
}

$.fn.limpiarDataTable = function()
{
  var table = $(this).DataTable();
 
  table
    .clear()
    .draw();
}

function subirArchivos(vFiles, parametros, fCallback, fCallback_Error)
{
   var data = new FormData();

   fCallback = fCallback || function(){};
   fCallback_Error = fCallback_Error || function(){};

    $.each(vFiles, function(key, value)
    {
        data.append(key, value);
    });

    if (parametros != undefined && parametros != null)
    {
      $.each(parametros, function(index, val) 
      {
        data.append(index, val);
      });
    }


    $.ajax({
          url: '../server/php/subirArchivos.php',
          type: 'POST',
          data: data,
          cache: false,
          dataType: 'html',
          processData: false, // Don't process the files
          contentType: false, // Set content type to false as jQuery will tell the server its a query string request
          success: function(data, textStatus, jqXHR)
          {
              if( parseInt(data) >= 1)
              {
                fCallback(data);
              }
              else
              {
                  Mensaje('Error:', data);
                  fCallback_Error(data);
              }
          },
          error: function(jqXHR, textStatus, errorThrown)
          {
              Mensaje('Error:', textStatus);
              fCallback_Error(textStatus);
          }
      });
}

function subirArchivo (Prefijo, Proceso, Observaciones, callback)
{
  Prefijo = Prefijo || obtenerPrefijo();
  Observaciones = Observaciones || '';
  callback == callback || function(){};

  subirArchivos(files, {
    Prefijo : Prefijo,
    Proceso : Proceso,
    Observaciones : Observaciones,
    Usuario : Usuario.id
  }, function()
  {
    Mensaje("Hey", "Los datos han sido ingresados", "success");
    callback(Prefijo);
  });
}

$.fn.optCargarParametro = function(d)
{
  var obj = this;
  $(obj).find("option").remove();

  d.textoInicial = d.textoInicial || 'Selecciona una opción';
  d.Parametro = d.Parametro || '';

  $.post('../server/php/proyecto/' + d.url, 
  {
    Usuario : Usuario.id,
    Parametro : d.Parametro
  }, function(data, textStatus, xhr) 
  {
    var tds = '<option value="">' + d.textoInicial + '</option>';
    $.each(data, function(index, val) 
    {
      tds += '<option value="' + val.id + '">' + val.Nombre + '</option>';
    });
    $(obj).append(tds);
  }, 'json'); 
}

function devolverNumText(string){//solo letras y numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.-@';//Caracteres validos
  
    for (var i=0; i<string.length; i++)
       if (filtro.indexOf(string.charAt(i)) != -1) 
       out += string.charAt(i);
    return out;
}

function hexTorgb(h)
{
  return {
    r : parseInt(h.substring(0,2),16), 
    g : parseInt(h.substring(2,4),16),
    b : parseInt(h.substring(4,6),16) 
  };
}