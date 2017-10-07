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

  $("#frmCopasst_AEC_Candidatos").on("submit", function(evento)
  {
    evento.preventDefault();
    if ($('#txtCopasst_AEC_Candidato_Nombre').val() == '')
    {
      $('#txtCopasst_AEC_Candidato_Nombre').focus();
    } else
    {
      if ($('#txtCopasst_AEC_Candidato_Identificacion').val() == '') 
      {
        $('#txtCopasst_AEC_Candidato_Identificacion').focus();
      } else
      {
        var datos = {
          id : 0,
          Nombre : $('#txtCopasst_AEC_Candidato_Nombre').val(),
          Cargo : $('#txtCopasst_AEC_Candidato_Cargo').val(),
          Identificacion : $('#txtCopasst_AEC_Candidato_Identificacion').val(),
          Votos : 0
        };
        Copasst_AgregarCandidato(datos);
        $('#txtCopasst_AEC_Candidato_Nombre').val('');
        $('#txtCopasst_AEC_Candidato_Cargo').val('');
        $('#txtCopasst_AEC_Candidato_Identificacion').val('');
      }
    }
  });

  $("#btnCopasst_AEC_Candidatos_Empleador").on("submit", function(evento)
  {
    evento.preventDefault();
    if ($('#txtCopasst_AEC_Candidato_Empleador_Nombre').val() == '')
    {
      $('#txtCopasst_AEC_Candidato_Empleador_Nombre').focus();
    } else
    {
      if ($('#txtCopasst_AEC_Candidato_Empleador_Identificacion').val() == '') 
      {
        $('#txtCopasst_AEC_Candidato_Empleador_Identificacion').focus();
      } else
      {
        var datos = {
          id : 0,
          Nombre : $('#txtCopasst_AEC_Candidato_Empleador_Nombre').val(),
          Cargo : $('#txtCopasst_AEC_Candidato_Empleador_Cargo').val(),
          Identificacion : $('#txtCopasst_AEC_Candidato_Empleador_Identificacion').val()
        };
        Copasst_AgregarCandidatoEmpleador(datos);
        $('#txtCopasst_AEC_Candidato_Empleador_Nombre').val('');
        $('#txtCopasst_AEC_Candidato_Empleador_Cargo').val('');
        $('#txtCopasst_AEC_Candidato_Empleador_Identificacion').val('');
      }
    }
  });
});

function Copasst_ActaDeEleccionYConformacion()
{
  var tFecha = obtenerFecha().substring(0, 10); 
  $("#txtCopasst_AEC_Anio").val(tFecha.substring(0, 4));  
}

function Copasst_AgregarCandidato(datos)
{
  var tds = '<tr>';
    tds += '<td>';
      tds += '<button class="btn btn-pure btn-primary icon wb-edit"></button>';
      tds += '<button class="btn btn-pure btn-danger icon wb-close"></button>';
    tds += '</td>';
    tds += '<td>' + datos.Nombre + '</td>';
    tds += '<td>' + datos.Cargo + '</td>';
    tds += '<td>' + datos.Identificacion + '</td>';
    tds += '<td><input type="number" value="' + datos.Votos + '" placeholder="Votos" class="form-control"></td>';
  tds += '</tr>';
  $('#tblCopasst_AEC_Candidatos tbody').prepend(tds);
}

function Copasst_AgregarCandidatoEmpleador(datos)
{
  var tds = '<tr>';
    tds += '<td>';
      tds += '<button class="btn btn-pure btn-primary icon wb-edit"></button>';
      tds += '<button class="btn btn-pure btn-danger icon wb-close"></button>';
    tds += '</td>';
    tds += '<td>' + datos.Nombre + '</td>';
    tds += '<td>' + datos.Cargo + '</td>';
    tds += '<td>' + datos.Identificacion + '</td>';
  tds += '</tr>';
  $('#tblCopasst_AEC_Candidatos_Empleador tbody').prepend(tds);
}