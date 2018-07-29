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
});

function cpActas_CargarCompromisos()
{
  $('#tblCopasst_PDA_Compromisos tbody tr').remove();

  var datos = {
    Usuario : Usuario.id,
    idEmpresa : $('#txtInicio_idEmpresa').val(),
    Anio : $('#txtCopasst_Anio').val()
  };

  $.post('../server/php/proyecto/cp_Actas_CargarCompromisos.php', datos, function(data, textStatus, xhr) 
  {
    if (data != 0)
    {
      var tds = '';
      $.each(data, function(index, val) 
      {
        tds += '<tr>';
          tds += '<td></td>'
          tds += '<td>' + val.NoActa + '</td>'
          tds += '<td>' + val.fechaActa + '</td>'
          tds += '<td>' + val.Descripcion + '</td>'
          tds += '<td>' + val.Responsable + '</td>'
          tds += '<td>' + val.Fecha + '</td>'
          tds += '<td><input type="date" class="form-control"></td>'
          tds += '<td></td>'
        tds += '</tr>';
      });

      $('#tblCopasst_PDA_Compromisos').crearDataTable(tds, function(){}, true);
    }
  }, 'json');
}
