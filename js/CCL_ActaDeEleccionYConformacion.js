$(document).ready(function()
{
	CCL_ActaDeEleccionYConformacion();

  window.cntCCL_AEC_Resultados = null;

  $("#btnCCL_AEC_Actualizar").on('click', function(evento)
  {
    evento.preventDefault();
    CCL_CargarDatos();
  });

  $("#frmCCL_AEC .datepicker").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
    });

  $('#txtCCL_AEC_Fecha_Apertura').on('change', function()
  {
    var arrFecha = $(this).val().split('-');
    var tmpAnio = parseInt(arrFecha[0]) + 2;
    var tmpFecha = tmpAnio + '-' + arrFecha[1] + '-' + arrFecha[2]
    $('#txtCCL_AEC_Fecha_Cierre').val(tmpFecha);
  });

  $(".frmCCL_AEC_Candidatos").on("submit", function(evento)
  {
    evento.preventDefault();
    var idObj = $(this).attr('id');
    var Tipo = $(this).attr('data-tipo');
    if ($('#' + idObj + ' .txtCCL_AEC_Candidato_Nombre').val() == '')
    {
      $('#' + idObj + ' .txtCCL_AEC_Candidato_Nombre').focus();
    } else
    {
      if ($('#' + idObj + ' .txtCCL_AEC_Candidato_Identificacion').val() == '') 
      {
        $('#' + idObj + ' .txtCCL_AEC_Candidato_Identificacion').focus();
      } else
      {
        var datos = {
          id : 0,
          Nombre : $('#' + idObj + ' .txtCCL_AEC_Candidato_Nombre').val(),
          Cargo : $('#' + idObj + ' .txtCCL_AEC_Candidato_Cargo').val(),
          Identificacion : $('#' + idObj + ' .txtCCL_AEC_Candidato_Identificacion').val(),
          Tipo : Tipo,
          Votos : 0,
          idEmpresa : $('#txtInicio_idEmpresa').val(),
          idUsuario : Usuario.id,
          Anio : $('#txtCCL_AEC_Anio').val(),
          Posicion : 'Candidato'
        };

        $.post('../server/php/proyecto/ccl_AgregarCandidato.php', datos, function(data, textStatus, xhr) 
        {
          if (isNaN(data))
          {
            Mensaje('Error', data, 'danger');
          } else
          {
            datos.id = parseInt(data);
            CCL_AgregarCandidato(datos);
            $('#' + idObj + ' .txtCCL_AEC_Candidato_Nombre').val('');
            $('#' + idObj + ' .txtCCL_AEC_Candidato_Cargo').val('');
            $('#' + idObj + ' .txtCCL_AEC_Candidato_Identificacion').val('');
          }
        });
      }
    }
  });

  $('#frmCCL_AEC').on('submit', function(evento)
  {
    evento.preventDefault();
    $(this).generarDatosEnvio('txtCCL_AEC_', function(datos)
    {
      datos = $.parseJSON(datos);
      datos.idEmpresa = $('#txtInicio_idEmpresa').val();

      $.post('../server/php/proyecto/ccl_GuardarDatos.php', datos, function(data, textStatus, xhr) 
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

  $(document).delegate('.txtCCL_AEC_Candidato_Votos', 'change', function(event) {
    var idCandidato = $(this).attr('data-idCandidato');
    var Votos = $(this).val();
    $.post('../server/php/proyecto/ccl_CambiarVotos.php', {idCandidato: idCandidato, Votos: Votos}, function(data, textStatus, xhr) 
    {
      CCL_GraficarResultado(); 
    });
  });

  $(document).delegate('.txtCCL_AEC_Candidato_Posicion', 'change', function(event) {
    var idCandidato = $(this).attr('data-idCandidato');
    var Posicion = $(this).val();
    $.post('../server/php/proyecto/ccl_CambiarPosicion.php', {idCandidato: idCandidato, Posicion: Posicion}, function(data, textStatus, xhr) 
    {
      
    });
  });

  

  $(document).delegate('.btnCCL_AEC_QuitarCandidato', 'click', function(event) 
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
            $.post('../server/php/proyecto/ccl_QuitarCandidato.php', {idCandidato: idCandidato, Usuario : Usuario.id}, function(data, textStatus, xhr) 
            {
              $(fila).remove();
              CCL_GraficarResultado();
            });
          }
        }
      });
  }); 
});

function CCL_ActaDeEleccionYConformacion(){
  $("#txtCCL_AEC_Anio").val($('#txtCCL_Anio').val());  
  $('#txtCCL_AEC_Logo').attr('src', '../server/php/' + Empresa.Ruta + '/' + Empresa.Archivo);
}

function CCL_AgregarCandidato(datos)
{
  var tds = '<tr data-tipo="' + datos.Tipo + '">';
    tds += '<td>';
      tds += '<button data-idCandidato="' + datos.id + '" class="btn btn-pure btn-danger icon wb-close btnCCL_AEC_QuitarCandidato"></button>';
    tds += '</td>';
    tds += '<td>' + datos.Nombre + '</td>';
    tds += '<td>' + datos.Cargo + '</td>';
    tds += '<td>' + datos.Identificacion + '</td>';
    if (datos.Tipo == 'Trabajador')
    {
      tds += '<td><input type="number" data-idCandidato="' + datos.id + '" value="' + datos.Votos + '" placeholder="Votos" class="form-control txtCCL_AEC_Candidato_Votos"></td>';
    }

    if (datos.Tipo != 'Jurados')
    {
      tds += '<td><select data-idCandidato="' + datos.id + '" class="form-control txtCCL_AEC_Candidato_Posicion">';
        tds += '<option value="Candidato">Candidato</option>';
        tds += '<option value="Pincipal">Principal</option>';
        tds += '<option value="Suplente">Suplente</option>';
      tds += '</select><td>';
    } else{
        $('#cntCCL_AEC_FirmasJurados').append(`<div class="cntCCLJuradosFirma"><h4>${datos.Nombre}</h4><h6>${datos.Cargo}</h6><h6>${datos.Identificacion}<h6></div>`);
    }
  tds += '</tr>';

  if (datos.Tipo == 'Trabajador')
  {
   $('#tblCCL_AEC_Candidatos tbody').prepend(tds);
  } else
  {
    if (datos.Tipo == 'Empleador')
    {
      $('#tblCCL_AEC_Candidatos_Empleador tbody').prepend(tds);
    } else
    {
      $('#tblCCL_AEC_Candidatos_Jurados tbody').prepend(tds);
    }
  }

  $('.txtCCL_AEC_Candidato_Posicion[data-idCandidato="' + datos.id + '"]').val(datos.Posicion);
}

function CCL_CargarDatos(){
  var tmpAnio = $('#txtCCL_AEC_Anio').val();
  $('.txtCCL_Empresa').text(Empresa.Nombre);
  $('.txtCCL_EmpresaNit').text(Empresa.NIT);
  $('#txtCCL_Anio').val(tmpAnio);
  $('#frmCCL_AEC')[0].reset();
  $('#frmCCL_AEC_Candidatos_Empleador')[0].reset();
  $('#frmCCL_AEC')[0].reset();
  
  $('#cntCCL_AEC_FirmasJurados div').remove();

  $('#txtCCL_AEC_Anio').val(tmpAnio);

  $('#tblCCL_AEC_Candidatos tbody tr').remove();
  $('#tblCCL_AEC_Candidatos_Empleador tbody tr').remove();
  $('#tblCCL_AEC_Candidatos_Jurados tbody tr').remove();
  

  var datos = {
    Usuario : Usuario.id,
    idEmpresa : $('#txtInicio_idEmpresa').val(),
    Anio : $('#txtCCL_AEC_Anio').val()
  };

  $.post('../server/php/proyecto/ccl_CargarDatos.php', datos, function(data, textStatus, xhr) 
  {
    if (data.Datos != 0)
    {
      $.each(data.Datos, function(index, val) 
      {
        $('#txtCCL_AEC_' + index).val(val);
      });
    }

    if (data.Candidatos != 0)
    {
      $.each(data.Candidatos, function(index, val) 
      {
        CCL_AgregarCandidato(val);
      });
    }
    CCL_GraficarResultado();
  }, 'json');
}

function CCL_GraficarResultado()
{
  var filas = $('#tblCCL_AEC_Candidatos tbody tr');
  if (filas.length == 0)
  {
    $('#cntCCL_AEC_Resultados').hide();
  } else
  {
    $('#cntCCL_AEC_Resultados').show();

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
    
    var ctx = document.getElementById("cntCCL_AEC_Resultados").getContext("2d");
    if (window.cntCCL_AEC_Resultados != null)
    {
      window.cntCCL_AEC_Resultados.destroy();
    }

    window.cntCCL_AEC_Resultados = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          maintainAspectRatio : false,
            responsive: true
        },
        scaleStartValue: 0
    });
    window.cntCCL_AEC_Resultados.canvas.parentNode.style.height = '380px';
  }
}


