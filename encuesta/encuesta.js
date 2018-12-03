function cargarEncuesta(){
  $.post("php/cargarEncuesta.php", {
      idEmpresa : $('#txtIdEmpresa').val(),
      hash : getParameterByName('h')
    }, function(data){
      if (data != 0){
        let tds = '';
        $('#txtIdEncuesta').val(data.id);
        $('#lblTitulo').text(data.titulo);
        $('#txtIdRegistro').val(data.idRegistro);
        $.each(data.preguntas, function(index, val) {
          if (val.tipo < 5){
            if (val.tipo === 2){
              tds += `<div class="cntPregunta">`
                tds += `<h3 class="pregunta">${val.titulo}</h3>`
                tds += `<div>`
                  tds += `<textarea class="form-control respuesta" data-id="${val.id}" placeholder="${val.titulo}" rows="4"></textarea>`
                tds += `</div>`
              tds += `</div>`
            } else{
              let _tipo = 'text';
              switch (val.tipo){
                case  1:
                  _tipo = 'text';
                break;
                case  3:
                  _tipo = 'number';
                break;
                case  4:
                  _tipo = 'date';
                break;
                default :
                  "text"
              }
              tds += `<div class="cntPregunta">`;
                tds += `<h3 class="pregunta">${val.titulo}</h3>`;
                tds += `<div>`;
                  tds += `<input class="form-control respuesta" data-id="${val.id}" placeholder="${val.titulo}" type="${_tipo}">`;
                tds += `</div>`;
              tds += `</div>`;
            }
          } else{
            const 
              _tipo = (val.tipo === 5 ? 'checkbox' : 'radiobutton'),
              _tipoTag = (val.tipo === 5 ? 'checkbox' : 'radio');

              tds += `<div class="cntPregunta">`;
                tds += `<h3 class="pregunta">${val.titulo}</h3>`;
                tds += `<div class="cntOpciones">`;
                tds += `<input type="hidden" class="respuesta" data-id="${val.id}">`;

                $.each(val.opciones, function(index2, val2) {
                  tds += `<label class="${_tipo}-container">${val2.titulo}`;
                    tds += `<input type="${_tipoTag}" class="opt" data-id="${val2.id}" name="opt${val.id}">`;
                    tds += `<span class="checkmark"></span>`;
                  tds += `</label>`;
                });
                tds += `</div>`;
              tds += `</div>`;
          }
        });
        $('#cntPreguntas').append(tds);
      } else{
        $('#btnGuardar').remove();
      }
    }, 'json');
}

$(document).delegate('.cntPregunta .opt', 'click', function(event) {
  const 
    contenedor = $(this).parent('label').parent('div'),
    respuesta = $(contenedor).find('.respuesta')[0],
    marcados = $(contenedor).find('input:checked');

    let _idsMarcados = '';
    $.each(marcados, function(index, val) {
       _idsMarcados += $(val).attr('data-id') + ',';
    });
    _idsMarcados = _idsMarcados.substr(0, (_idsMarcados.length-1));
    $(respuesta).val(_idsMarcados);

});


$('#btnGuardar').on('click', function(event){
  event.preventDefault();
  const 
    respuestas = $('#cntPreguntas .respuesta'),
    data = [];


  $.each(respuestas, function(index, val) {
     data.push({
      id : $(val).attr('data-id'),
      valor : $(val).val()
     });
  });

  $.post('php/guardarEncuesta.php', {
    idEmpresa : $('#txtIdEmpresa').val(),
    idEncuesta : $('#txtIdEncuesta').val(),
    idRegistro : $('#txtIdRegistro').val(),
    respuestas : data
  }, function(data, textStatus, xhr) {
    $('#workarea').hide();
    $('#cntAgradecimiento').slideDown();
  });
});