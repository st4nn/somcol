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

  $(document).delegate('.txtCP_PlanDeAccion_FechaCumplimiento', 'change', function(event) {
    const _val = $(this).val();
    const _id = $(this).attr('idPDA');
    const self = this;
    $.post('../server/php/proyecto/cp_Compromisos_ActualizarFecha.php', 
      {
        fechaCumplimiento: _val, 
        id : _id, 
        Usuario : Usuario.id
      }, function(data, textStatus, xhr) {
        const _tr = $(self).parent('td').parent('tr');
        $(_tr).removeClass('rowPendiente');
        $(_tr).addClass('rowCompletado');
        const _arrTd = $(_tr).find('td');
        $(_arrTd[7]).text('Completado');
     }, 'json');
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

  if (window.cntCopasst_PlanDeAccion_Grafica_ != null){
    window.cntCopasst_PlanDeAccion_Grafica_.destroy();
  }

  $.post('../server/php/proyecto/cp_Actas_CargarCompromisos.php', datos, function(data, textStatus, xhr) {
    if (data != 0){
      var tds = '';
      $.each(data, function(index, val){
        tds += `<tr class="${(val.fechaCumplimiento === '0000-00-00' ? 'rowPendiente': 'rowCompletado')}">`;
          tds += '<td></td>';
          tds += '<td>' + val.NoActa + '</td>';
          tds += '<td>' + val.fechaActa + '</td>';
          tds += '<td>' + val.Descripcion + '</td>';
          tds += '<td>' + val.Responsable + '</td>';
          tds += '<td>' + val.Fecha + '</td>';
          tds += `<td><input idPDA="${val.id}" class="form-control datepicker txtCP_PlanDeAccion_FechaCumplimiento" value="${(val.fechaCumplimiento === '0000-00-00' ? '': val.fechaCumplimiento)}"></td>`;;
          tds += '<td>' + (val.fechaCumplimiento === '0000-00-00' ? 'Pendiente': 'Completado') + '</td>';
        tds += '</tr>';
      });

      $('#tblCopasst_PDA_Compromisos').crearDataTable(tds, function(){
        $('#tblCopasst_PDA_Compromisos .datepicker').datepicker({
            clearBtn: true,
            language: "es",
            orientation: "top auto",
            daysOfWeekHighlighted: "0",
            autoclose: true,
            todayHighlight: true
        });
      }, true);
      Copasst_ActaDeEleccionYConformacion_Graficar(data);
    }
  }, 'json');
}


function Copasst_ActaDeEleccionYConformacion_Graficar(_data){
  var tmpCeldas;
  
  const _arrData = {'Pendiente' : 0, Completados : 0};
  
  $.each(_data, function(index, val) {
    if (val.fechaCumplimiento === '0000-00-00'){
      _arrData.Pendiente = _arrData.Pendiente + 1;
    } else{
      _arrData.Completados = _arrData.Pendiente + 1;
    }
  });
  
  var cP = hexTorgb(Empresa.colorPrimario);
  var cS = hexTorgb(Empresa.colorSecundario);
  
   var barChartData = {
          labels: [''],
          datasets: [{
              label: 'Pendientes',
              backgroundColor: 'rgba(' + cP.r + ',' + cP.g + ',' + cP.b + ', 0.6)',
              borderColor: '#' + Empresa.colorPrimario,
              borderWidth: 1,
              data: [_arrData.Pendiente]
          }, {
            label: 'Completados',
              backgroundColor: 'rgba(' + cS.r + ',' + cS.g + ',' + cS.b + ', 0.6)',
              borderColor: '#' + Empresa.colorSecundario,
              borderWidth: 1,
              data: [_arrData.Completados]
          }]
      };
  
  var ctx = document.getElementById("cntCopasst_PlanDeAccion_Grafica").getContext("2d");

  window.cntCopasst_PlanDeAccion_Grafica_ = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        maintainAspectRatio : false,
          responsive: true
      },
      scaleStartValue: 0
  });
  window.cntCopasst_PlanDeAccion_Grafica_.canvas.parentNode.style.height = '380px';
}