$(document).ready(function()
{

	$("#lnkEmpresas_VolverABusqueda").on("click", function(evento)
	{
		evento.preventDefault();
		$("#cntEmpresas_Creacion").hide();
		$("#cntEmpresas_Listado").slideDown();
	});

	$("#btnEmpresas_CrearEmpresa").on("click", function(evento)
	{
		evento.preventDefault();
		$("#lblEmpresas_Creacion_Titulo").text('Crear Empresa');
		$("#txtEmpresas_Crear_id").val("NULL");
		$("#cntEmpresas_Listado").hide();
		$("#cntEmpresas_Creacion").slideDown();	

		$("#btnEmpresas_Crear_Borrar").hide();

		$("#frmEmpresas_Crear")[0].reset();
		document.getElementById("txtEmpresas_Crear_ColorPrincipal").jscolor.fromString('37474F');
		document.getElementById("txtEmpresas_Crear_ColorSecundario").jscolor.fromString('76838F');

		
	});

	$("#cntEmpresas_Imagen").iniciar_CargadorImagenes({idObj : 'Empresas_Crear'});

	$("#btnEmpresas_Crear_Limpiar").on("click", function(evento)
	{
		evento.preventDefault();
		$("#frmEmpresas_Crear")[0].reset();
		$('#txtEmpresas_Crear_Etiqueta').val('');
        $('#txtEmpresas_Crear_Archivo').val('');
        $('#imgEmpresas_Crear_Preview').attr('src', '');  
	});

	var vFrmEmpresas_Crear = false;

	$("#frmEmpresas_Crear").on("submit", function(evento)
	{
		evento.preventDefault();

		if (!vFrmEmpresas_Crear)
		{
			vFrmEmpresas_Crear = true;
			if ($("#txtEmpresas_Crear_Archivo").val() == '' && $("#txtEmpresas_Crear_id").val() == "NULL")
			{
				Mensaje("Error", 'Por favor seleccione una imagen que identifique a la Empresa', 'danger');
				vFrmEmpresas_Crear = false;
			} else
			{
				if ($("#txtEmpresas_Crear_Nombre").val() == '')
				{
					Mensaje("Error", 'No es posible crear una Empresa sin nombre', 'danger');
					$("#txtEmpresas_Crear_Nombre").focus();
					vFrmEmpresas_Crear = false;
				} else
				{
					if ($("#txtEmpresas_Crear_Correo").val() == '')
					{
						Mensaje("Error", 'Es importante poner un correo de Contacto', 'danger');
						$("#txtEmpresas_Crear_Correo").focus();
						vFrmEmpresas_Crear = false;
					} else
					{
						$("#frmEmpresas_Crear").generarDatosEnvio("txtEmpresas_Crear_", function(datos)
						{
							datos = JSON.parse(datos);
							vFrmEmpresas_Crear = false;
							$.post('../server/php/proyecto/Empresas_Crear.php', datos, function(data, textStatus, xhr) 
							{
								vFrmEmpresas_Crear = false;
								if (!isNaN(data))
								{
									if ($("#txtEmpresas_Crear_Archivo").val() != '')
									{
										subirArchivos(files, {
											Prefijo : data,
											Proceso : 'empresa_Logo',
											Observaciones : '',
											Usuario : Usuario.id
										}, function()
										{
											Mensaje("Hey", "Los datos han sido ingresados", "success");
											$("#txtEmpresas_Crear_id").val(data);
										});
									} else
									{
										Mensaje("Hey", "Los datos han sido ingresados", "success");
										$("#txtEmpresas_Crear_id").val(data);
									}
									$("#frmEmpresas_Buscar").trigger('submit');
								} else
								{
									Mensaje("Error", data, "danger");
									vFrmEmpresas_Crear = false;
								}
							});
						});
					}
				}
			}
		}

	});

	$("#btnEmpresas_Guardar").on("click", function()
	{
		$("#frmEmpresas_Crear").trigger("submit");
	});

	$("#frmEmpresas_Buscar").on("submit", function(evento)
	{
		evento.preventDefault();

		$("#tblEmpresas_Listado").slideDown();

		/*var l = Ladda.create(this);
		l.start();*/

		$("#tblEmpresas_Listado li").remove();


		$.post('../server/php/proyecto/Empresas_Buscar.php', {Usuario : Usuario.id, Parametro : $("#txtReportes_OT_Buscar").val()}, function(data, textStatus, xhr) 
		{
			var tds = '';
			if (data != 0)
			{
				var tmpEstado = 'online'; //away
				var tmpEstadoLabel = 'Desactivar';
				var tmpEstadoIcon = 'stop';
				var tmpEstadoid = '1';

				$.each(data, function(index, val) 
				{
					tmpEstado = 'online';
					tmpEstadoLabel = 'Desactivar';
					tmpEstadoIcon = 'stop';
					tmpEstadoid = '2';

					if (val.Estado == 2)
					{
						tmpEstado = 'away';
						tmpEstadoLabel = 'Activar';
						tmpEstadoIcon = 'play';
						tmpEstadoid = '1';
					} 

					tds += '<li class="list-group-item">';
	                    tds += '<div class="media">';
	                      tds += '<div class="media-left">';
	                        tds += '<div class="avatar avatar-' + tmpEstado + '">';
	                          tds += '<img src="../server/php/' + val.Ruta + '/' + val.Archivo + '" alt="...">';
	                          tds += '<i class="avatar avatar-online"></i>';
	                        tds += '</div>';
	                      tds += '</div>';
	                      tds += '<div class="media-body">';
	                        tds += '<h4 class="media-heading">';
	                          tds += '<span>' + val.Nombre + '</span>';
	                          tds += '<small> ' + val.fechaCargue + '</small>';
	                        tds += '</h4>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color wb-map" aria-hidden="true"></i>' + val.Direccion;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color wb-envelope" aria-hidden="true"></i><a href="mailto:' + val.Correo + '">' + val.Correo + '</a>';
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color wb-mobile" aria-hidden="true"></i>' + val.Telefono;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<small><strong>Creado por:</strong> <a href="mailto:' + val.uCorreo + '">' + val.Usuario +'</a></small>';
	                        tds += '</p>';
	                        tds += '<p class="col-sm-12">';
	                          tds += '<small><i>Actividad Económica</i>: </small><span class="txtEmpresas_ActividadEconomica">' + val.ActividadEconomica + '</span>';
	                        tds += '</p>';
	                        tds += '<p class="col-sm-12">';
	                          tds += '<strong><small>Representante Legal:</small> <i class="txtEmpresas_RepresentanteLegal">' + val.RepresentanteLegal + '</i></strong>';
	                        tds += '</p>';
	                        tds += '<input class="txtEmpresas_ColorPrimario" type="hidden" value="' + val.colorPrimario + '">';
	                        tds += '<input class="txtEmpresas_ColorSecundario" type="hidden" value="' + val.colorSecundario + '">';
	                      tds += '</div>';
	                      tds += '<div class="media-footer">';
	                        tds += '<button type="button" idEmpresa="' + val.id + '"class="btn btn-outline btn-success btn-sm col-md-2 margin-left-5 btnEmpresas_Abrir"><i class="icon wb-play"></i>Abrir</button>';
	                        tds += '<button type="button" idEmpresa="' + val.id + '"class="btn btn-outline btn-info btn-sm col-md-2 margin-left-5 btnEmpresas_Editar"><i class="icon wb-edit"></i>Editar</button>';
	                        tds += '<button type="button" idEmpresa="' + val.id + '"class="btn btn-outline btn-warning btn-sm col-md-2 margin-left-5 btnEmpresas_Activacion" idEstado="' + tmpEstadoid + '"><i class="icon wb-' + tmpEstadoIcon + '"></i>' + tmpEstadoLabel + '</button>';
	                        tds += '<button type="button" idEmpresa="' + val.id + '"class="btn btn-outline btn-danger btn-sm col-md-2 margin-left-5 btnEmpresas_Activacion" idEstado="0"><i class="icon fa-trash-o"></i>Borrar</button>';
	                      tds += '</div>';
	                    tds += '</div>';
	                tds += '</li>';
				});
			} else
			{
				tds += '<li class="list-group-item">';
                    tds += '<h1>No hay datos para mostras</h1>';
                tds += '</li>';
			}

			$("#tblEmpresas_Listado").append(tds);

		}, 'json').always(function() { /*l.stop();*/ });
	});

	$(document).delegate('.btnEmpresas_Abrir', 'click', function(evento)
		{
			evento.preventDefault();
			var tmpidEmpresa = $(this).attr("idEmpresa");

			$("#txtInicio_idEmpresa").val(tmpidEmpresa);

			$.post('../server/php/proyecto/Empresas_Cargar.php', 
				{
					Usuario: Usuario.id, 
					Parametro : '',
					idEmpresa : tmpidEmpresa
				}, function(data, textStatus, xhr) {
			        $.each(data, function(index, val) {
			        	Empresa = val;
			            $(".imgLogoEmpresa").attr("src", '../server/php/' + val.Ruta + '/' + val.Archivo);
			            $(".lblEmpresa_Nombre").text(val.Nombre);
			            
			            $(".lblEmpresa_Direccion").text(val.Direccion);
			            $(".lblEmpresa_Telefono").text(val.Telefono);
			            $(".lblEmpresa_Responsable").text(val.Correo);

			            $("#txtInicio_idEmpresa").val(val.id);

			            $('.site-navbar .navbar-container').css('background-color' , '#' + val.colorPrimario);
			            $('.cntUbicacionModulo').css('background' , '#' + val.colorSecundario);
			        });
					cargarModulo("Inicio.html", 'Inicio');
			     }, 'json');
		});

	$(document).delegate('.btnEmpresas_Editar', 'click', function(event) 
	{
		event.preventDefault();

		$("#lblEmpresas_Creacion_Titulo").text('Editar Empresa');
		$("#cntEmpresas_Listado").hide();
		$("#cntEmpresas_Creacion").slideDown();	

		$("#btnEmpresas_Crear_Borrar").hide();

		var contenedor = $(this).parent("div").parent('div');
		var tmp = $(contenedor).find("img").attr("src");
		$("#imgEmpresas_Crear_Preview").attr('src', tmp);
		
		tmp = $(contenedor).find(".media-heading").find("span");
		$("#txtEmpresas_Crear_Nombre").val($(tmp).text());
		
		tmp = $(contenedor).find(".media-body").find("p");

		$("#txtEmpresas_Crear_Direccion").val($(tmp[0]).text());
		$("#txtEmpresas_Crear_Telefono").val($(tmp[2]).text());
		$("#txtEmpresas_Crear_Correo").val($(tmp[1]).text());
		$("#txtEmpresas_Crear_Correo").val($(tmp[1]).text());
		$("#txtEmpresas_Crear_Correo").val($(tmp[1]).text());
		

		tmp = $(this).attr("idEmpresa");
		$("#txtEmpresas_Crear_id").val(tmp);

		document.getElementById("txtEmpresas_Crear_ColorPrincipal").jscolor.fromString($(contenedor).find('.txtEmpresas_ColorPrimario').val());
		document.getElementById("txtEmpresas_Crear_ColorSecundario").jscolor.fromString($(contenedor).find('.txtEmpresas_ColorSecundario').val());

		$("#txtEmpresas_Crear_ActividadEconomica").val($(contenedor).find('.txtEmpresas_ActividadEconomica').text());
		$("#txtEmpresas_Crear_RepresentanteLegal").val($(contenedor).find('.txtEmpresas_RepresentanteLegal').text());
	});

	$(document).delegate('.btnEmpresas_Activacion', 'click', function(event) 
	{
		event.preventDefault();

		var idEstado = parseInt($(this).attr("idEstado"));
		var idEmpresa = $(this).attr("idEmpresa");

		var tmpEstado = 'Borrar';

		if (idEstado == 1)
		{
			tmpEstado = 'Activar';
		}

		if (idEstado == 2)
		{
			tmpEstado = 'Desactivar';
		}

		bootbox.confirm({
        message: "Estas seguro de " + tmpEstado + " esta Empresa?",
        buttons: {
            confirm: {
                label: 'Si, ' + tmpEstado,
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
			$.post('../server/php/proyecto/Empresas_CambiarEstado.php', 
				{
					Usuario : Usuario.id,
					idEstado : idEstado,
					idEmpresa : idEmpresa
				}, function(data, textStatus, xhr) 
				{
					if (data == 1)
					{
						$("#frmEmpresas_Buscar").trigger('submit');
					} else
					{
						Mensaje("Error", data, "danger");
					}
				});
          }
        }
      });

	});
});
