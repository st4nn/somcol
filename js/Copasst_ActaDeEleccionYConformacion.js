$(document).ready(function()
{
	Copasst_ActaDeEleccionYConformacion();

  $("#frmCopasst_AEC .datepicker").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
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
          Anio : $('#txtCopasst_AEC_Anio').val()
        };

        $.post('../server/php/proyecto/cp_AgregarCandidato.php', datos, function(data, textStatus, xhr) 
        {
          if (isNaN(data))
          {
            Mensaje('Error', data, 'danger');
          } else
          {
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
      tds += '<button class="btn btn-pure btn-primary icon wb-edit"></button>';
      tds += '<button class="btn btn-pure btn-danger icon wb-close"></button>';
    tds += '</td>';
    tds += '<td>' + datos.Nombre + '</td>';
    tds += '<td>' + datos.Cargo + '</td>';
    tds += '<td>' + datos.Identificacion + '</td>';
    if (datos.Tipo == 'Trabajador')
    {
      tds += '<td><input type="number" value="' + datos.Votos + '" placeholder="Votos" class="form-control"></td>';
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