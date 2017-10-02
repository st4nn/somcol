function cargarCargos(f_callback, err_Callback)
{
    if (err_Callback === undefined)
    {
        err_Callback = function()
        {
            cargarModulo('gHumana/organigrama.html', 'Organigrama de Gestión Humana', function()
            {
                Mensaje("Hey", "Debes crear primero el Organigrama", "danger");
            });
        }
    }

    $.post('../server/php/proyecto/gHumana_CargarCargos.php', {Usuario : Usuario.id, idEmpresa : $("#txtInicio_idEmpresa").val()}, 
    function(data, textStatus, xhr) 
    {
        tdsOpersonal_Option = '';
        if (data != 0)
        {
            f_callback(data);
        } else
        {
            err_Callback();
        }
    }, 'json');
}

function cargarRiesgos_Clasificacion(f_callback, err_Callback)
{
    if (err_Callback === undefined)
    {
        err_Callback = function(){};
    }

    $.post('../server/php/proyecto/gProcesos_CargarRiesgos_Clasificacion.php', {Usuario : Usuario.id, idEmpresa : $("#txtInicio_idEmpresa").val()}, 
    function(data, textStatus, xhr) 
    {
        tdsOpersonal_Option = '';
        if (data != 0)
        {
            f_callback(data);
        } else
        {
            err_Callback();
        }
    }, 'json');
}