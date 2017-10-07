$(document).ready(function()
{
	Copasst_ActaDeEleccionYConformacion();
});

function Copasst_ActaDeEleccionYConformacion()
{
  var tFecha = obtenerFecha().substring(0, 10); 
  $("#txtCopasst_AEC_Anio").val(tFecha.substring(0, 4));

  /*$("#txtCopasst_EntregaEPP_fechaEntrega.datepicker").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
    });
    */
   
}