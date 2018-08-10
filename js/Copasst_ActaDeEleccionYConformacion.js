$(document).ready(function()
{
	Copasst_ActaDeEleccionYConformacion();

  window.cntCopasst_AEC_Resultados = null;

  $("#btnCopasst_AEC_Actualizar").on('click', function(evento)
  {
    evento.preventDefault();
    Copasst_CargarDatos();
  });

  $("#frmCopasst_AEC .datepicker").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
    });

  $('#txtCopasst_AEC_Fecha_Apertura').on('change', function()
  {
    var arrFecha = $(this).val().split('-');
    var tmpAnio = parseInt(arrFecha[0]) + 2;
    var tmpFecha = tmpAnio + '-' + arrFecha[1] + '-' + arrFecha[2]
    $('#txtCopasst_AEC_Fecha_Cierre').val(tmpFecha);
  });

  $(".frmCopasst_AEC_Candidatos").on("submit", function(evento)
  {
    evento.preventDefault();
    var idObj = $(this).attr('id');
    var Tipo = $(this).attr('data-tipo');
    if ($('#' + idObj + ' .txtCopasst_AEC_Candidato_Nombre').val() == '')
    {
      $('#' + idObj + ' .txtCopasst_AEC_Candidato_Nombre').focus();
    } else
    {
      if ($('#' + idObj + ' .txtCopasst_AEC_Candidato_Identificacion').val() == '') 
      {
        $('#' + idObj + ' .txtCopasst_AEC_Candidato_Identificacion').focus();
      } else
      {
        var datos = {
          id : 0,
          Nombre : $('#' + idObj + ' .txtCopasst_AEC_Candidato_Nombre').val(),
          Cargo : $('#' + idObj + ' .txtCopasst_AEC_Candidato_Cargo').val(),
          Identificacion : $('#' + idObj + ' .txtCopasst_AEC_Candidato_Identificacion').val(),
          Tipo : Tipo,
          Votos : 0,
          idEmpresa : $('#txtInicio_idEmpresa').val(),
          idUsuario : Usuario.id,
          Anio : $('#txtCopasst_AEC_Anio').val(),
          Posicion : 'Candidato'
        };

        $.post('../server/php/proyecto/cp_AgregarCandidato.php', datos, function(data, textStatus, xhr) 
        {
          if (isNaN(data))
          {
            Mensaje('Error', data, 'danger');
          } else
          {
            datos.id = parseInt(data);
            Copasst_AgregarCandidato(datos);
            $('#' + idObj + ' .txtCopasst_AEC_Candidato_Nombre').val('');
            $('#' + idObj + ' .txtCopasst_AEC_Candidato_Cargo').val('');
            $('#' + idObj + ' .txtCopasst_AEC_Candidato_Identificacion').val('');
          }
        });
      }
    }
  });

  $('#frmCopasst_AEC').on('submit', function(evento)
  {
    evento.preventDefault();
    $(this).generarDatosEnvio('txtCopasst_AEC_', function(datos)
    {
      datos = $.parseJSON(datos);
      datos.idEmpresa = $('#txtInicio_idEmpresa').val();

      $.post('../server/php/proyecto/cp_GuardarDatos.php', datos, function(data, textStatus, xhr) 
      {
        if (isNaN(data))
        {
          Mensaje('Error', data, 'danger');
        } else
        {
          Mensaje("!", 'Los datos han sido ingresados correctamente', 'success');
        }
      });

    });
  });

  $(document).delegate('.txtCopasst_AEC_Candidato_Votos', 'change', function(event) {
    var idCandidato = $(this).attr('data-idCandidato');
    var Votos = $(this).val();
    $.post('../server/php/proyecto/cp_CambiarVotos.php', {idCandidato: idCandidato, Votos: Votos}, function(data, textStatus, xhr) 
    {
      Copasst_GraficarResultado(); 
    });
  });

  $(document).delegate('.txtCopasst_AEC_Candidato_Posicion', 'change', function(event) {
    var idCandidato = $(this).attr('data-idCandidato');
    var Posicion = $(this).val();
    $.post('../server/php/proyecto/cp_CambiarPosicion.php', {idCandidato: idCandidato, Posicion: Posicion}, function(data, textStatus, xhr) 
    {
      
    });
  });

  

  $(document).delegate('.btnCopasst_AEC_QuitarCandidato', 'click', function(event) 
  {
    event.preventDefault();
    var idCandidato = $(this).attr('data-idCandidato');
    var fila = $(this).parent('td').parent('tr');

    bootbox.confirm({
        message: "Estas seguro de quitar este Candidato?",
        buttons: {
            confirm: {
                label: 'Si, quitarlo',
                className: 'btn-danger'
            },
            cancel: {
                label: 'No',
                className: 'btn-default'
            }
        },
        callback: function (result) {
          if (result)
          {
            $.post('../server/php/proyecto/cp_QuitarCandidato.php', {idCandidato: idCandidato, Usuario : Usuario.id}, function(data, textStatus, xhr) 
            {
              $(fila).remove();
              Copasst_GraficarResultado();
            });
          }
        }
      });
  }); 
});

function Copasst_ActaDeEleccionYConformacion(){
  $("#txtCopasst_AEC_Anio").val($('#txtCopasst_Anio').val());  
  $('#txtCopasst_AEC_Logo').attr('src', '../server/php/' + Empresa.Ruta + '/' + Empresa.Archivo);
}

function Copasst_AgregarCandidato(datos)
{
  var tds = '<tr data-tipo="' + datos.Tipo + '">';
    tds += '<td>';
      tds += '<button data-idCandidato="' + datos.id + '" class="btn btn-pure btn-danger icon wb-close btnCopasst_AEC_QuitarCandidato"></button>';
    tds += '</td>';
    tds += '<td>' + datos.Nombre + '</td>';
    tds += '<td>' + datos.Cargo + '</td>';
    tds += '<td>' + datos.Identificacion + '</td>';
    if (datos.Tipo == 'Trabajador')
    {
      tds += '<td><input type="number" data-idCandidato="' + datos.id + '" value="' + datos.Votos + '" placeholder="Votos" class="form-control txtCopasst_AEC_Candidato_Votos"></td>';
    }

    if (datos.Tipo != 'Jurados')
    {
      tds += '<td><select data-idCandidato="' + datos.id + '" class="form-control txtCopasst_AEC_Candidato_Posicion">';
        tds += '<option value="Candidato">Candidato</option>';
        tds += '<option value="Pincipal">Principal</option>';
        tds += '<option value="Suplente">Suplente</option>';
      tds += '</select><td>';
    }
  tds += '</tr>';

  if (datos.Tipo == 'Trabajador')
  {
   $('#tblCopasst_AEC_Candidatos tbody').prepend(tds);
  } else
  {
    if (datos.Tipo == 'Empleador')
    {
      $('#tblCopasst_AEC_Candidatos_Empleador tbody').prepend(tds);
    } else
    {
      $('#tblCopasst_AEC_Candidatos_Jurados tbody').prepend(tds);
    }
  }

  $('.txtCopasst_AEC_Candidato_Posicion[data-idCandidato="' + datos.id + '"]').val(datos.Posicion);
}

function Copasst_CargarDatos(){
  var tmpAnio = $('#txtCopasst_AEC_Anio').val();
  $('.txtCopasst_Empresa').text(Empresa.Nombre);
  $('.txtCopasst_EmpresaNit').text(Empresa.NIT);
  $('#txtCopasst_Anio').val(tmpAnio);
  $('#frmCopasst_AEC')[0].reset();
  $('#frmCopasst_AEC_Candidatos_Empleador')[0].reset();
  $('#frmCopasst_AEC')[0].reset();

  $('#txtCopasst_AEC_Anio').val(tmpAnio);

  $('#tblCopasst_AEC_Candidatos tbody tr').remove();
  $('#tblCopasst_AEC_Candidatos_Empleador tbody tr').remove();
  $('#tblCopasst_AEC_Candidatos_Jurados tbody tr').remove();
  

  var datos = {
    Usuario : Usuario.id,
    idEmpresa : $('#txtInicio_idEmpresa').val(),
    Anio : $('#txtCopasst_AEC_Anio').val()
  };

  $.post('../server/php/proyecto/cp_CargarDatos.php', datos, function(data, textStatus, xhr) 
  {
    if (data.Datos != 0)
    {
      $.each(data.Datos, function(index, val) 
      {
        $('#txtCopasst_AEC_' + index).val(val);
      });
    }

    if (data.Candidatos != 0)
    {
      $.each(data.Candidatos, function(index, val) 
      {
        Copasst_AgregarCandidato(val);
      });
    }
    Copasst_GraficarResultado();
  }, 'json');
}

function Copasst_GraficarResultado()
{
  var filas = $('#tblCopasst_AEC_Candidatos tbody tr');
  if (filas.length == 0)
  {
    $('#cntCopasst_AEC_Resultados').hide();
  } else
  {
    $('#cntCopasst_AEC_Resultados').show();

    var tmpCeldas;
    var datos = {labels : [''], data : [0]};
    $.each(filas, function(index, val) 
    {
      tmpCeldas = $(val).find('td');
      datos.labels.push($(tmpCeldas[1]).text());
      datos.data.push($(tmpCeldas[4]).find('input').val());
    });

    var cP = hexTorgb(Empresa.colorPrimario);
    
     var barChartData = {
            labels: datos.labels,
            datasets: [{
                label: '# de Votos',
                backgroundColor: 'rgba(' + cP.r + ',' + cP.g + ',' + cP.b + ', 0.6)',
                borderColor: '#' + Empresa.colorPrimario,
                borderWidth: 1,
                data: datos.data
            }]
        };
    
    var ctx = document.getElementById("cntCopasst_AEC_Resultados").getContext("2d");
    if (window.cntCopasst_AEC_Resultados != null)
    {
      window.cntCopasst_AEC_Resultados.destroy();
    }

    window.cntCopasst_AEC_Resultados = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          maintainAspectRatio : false,
            responsive: true
        },
        scaleStartValue: 0
    });
    window.cntCopasst_AEC_Resultados.canvas.parentNode.style.height = '380px';
  }
}


