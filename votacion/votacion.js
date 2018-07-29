function votacion(){

  var Usuario = localStorage.getItem('somcol_votacion');  
  if (Usuario == null){
    window.location = "../index.html";
  } else{
    Usuario = JSON.parse(Usuario);
    console.log(Usuario);
    //localStorage.clear();
  }

  $('#imgLogo').attr('src', Usuario.Logo);
  if (Usuario.Genero != 'M'){
    $('#lblGenero').text('a');
  }

  $("#txtUsuario").val(Usuario.Cedula);

  $(".btnVotar").live("click", function(evento){
      evento.preventDefault();
      var Candidato = $(this).parent("div");
      Candidato = $(Candidato).find("h2");
      Candidato = $(Candidato).find("a");
      Candidato = $(Candidato).text();
      $("#txtIdCandidato").val($(this).attr("idCandidato"));

      $.prompt("Confirma que desea votar por " + Candidato, {
        buttons: { "Si, Votar": true, "No, volver": false },
        show: 'slideDown',
        submit: function(e,v,m,f)
        {
            if (v)
            {
              $.post("php/votar.php", {
                  idCandidato : $("#txtIdCandidato").val(), 
                  cedula : $("#txtUsuario").val(),
                  idEmpresa : Usuario.idEmpresa,
                  Anio : Usuario.Anio
                },
                function(data)
                {
                  $.prompt(data);
                }).fail(function()
                {
                  $.prompt("No hay conexión con el Servidor, por favor intenta mas tarde");
                });
              
            }
        }
      });
    });
  $.post("php/cargarCandidatos.php", {
      idEmpresa : Usuario.idEmpresa,
      Anio : Usuario.Anio
    }, function(data)
    {
      $("#contenedorTarjetas div").remove();
      var tds = "";
      $.each(data, function(index, val) 
      {
        tds += '<div class="row-fluid blog tarjeta">';
            tds += '<div class="span4">';
                tds += '<img src="'+ val.foto + '" style="max-height: 130px; max-width:130px;" alt="">';
            tds += '</div>';
            tds += '<div class="span8">';
                tds += '<div class="date">';
                    tds += '<p class="day">Cargo</p>';
                    tds += '<p class="month">' + val.Cargo +'</p>';
                tds += '</div>';
                tds += '<h2>';
                    tds += '<a >' + val.Nombre + '</a><br>';
                tds += '</h2>';
                tds += '<a  class="btn btn-info btnVotar" idCandidato="' + val.id + '">Votar</a>';
            tds += '</div>';
        tds += '</div>';
      });
      $("#contenedorTarjetas").append(tds);

    }, "json");
}