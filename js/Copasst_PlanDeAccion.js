$(document).ready(function()
{
  $("#frmCopasst_PDA .datepicker").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
    });

  $("#frmCopasst_PDA").on("submit", function(evento)
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
          Anio : $('#txtCopasst_AEC_Anio').val()
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

function Copasst_ActaDeEleccionYConformacion()
{
  var tFecha = obtenerFecha().substring(0, 10); 
  $("#txtCopasst_AEC_Anio").val(tFecha.substring(0, 4));  
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
  tds += '</tr>';

  if (datos.Tipo == 'Trabajador')
  {
   $('#tblCopasst_AEC_Candidatos tbody').prepend(tds);
  } else
  {
    $('#tblCopasst_AEC_Candidatos_Empleador tbody').prepend(tds);
  }
}

function Copasst_CargarDatos()
{
  var tmpAnio = $('#txtCopasst_AEC_Anio').val();
  $('#frmCopasst_AEC')[0].reset();
  $('#frmCopasst_AEC_Candidatos_Empleador')[0].reset();
  $('#frmCopasst_AEC')[0].reset();

  $('#txtCopasst_AEC_Anio').val(tmpAnio);

  $('#tblCopasst_AEC_Candidatos tbody tr').remove();
  $('#tblCopasst_AEC_Candidatos_Empleador tbody tr').remove();

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
                label: '',
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
            responsive: true
        },
        scaleStartValue: 0
    });
  }
}