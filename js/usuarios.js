$(document).ready(function()
{
	$("#lnkUsuarios_VolverABusqueda").on("click", function(evento)
	{
		evento.preventDefault();
		$("#cntUsuarios_Creacion").hide();
		$("#cntUsuarios_Listado").slideDown();
	});

	$("#btnUsuarios_CrearUsuario").on("click", function(evento)
	{
		evento.preventDefault();
		$("#lblUsuarios_Creacion_Titulo").text('Crear Usuario');
		$("#cntUsuarios_Listado").hide();
		$("#cntUsuarios_Creacion").slideDown();	

		$("#btnUsuarios_Crear_Borrar").hide();

		$("#btnUsuarios_Crear_Limpiar").trigger('click');
	});

	$("#cntUsuarios_Imagen").iniciar_CargadorImagenes({idObj : 'Usuarios_Crear'});

	$("#btnUsuarios_Crear_Limpiar").on("click", function(evento)
	{
		evento.preventDefault();
		$("#frmUsuarios_Crear")[0].reset();
		$('#txtUsuarios_Crear_Etiqueta').val('');
        $('#txtUsuarios_Crear_Archivo').val('');
        $('#imgUsuarios_Crear_Preview').attr('src', '');  
	});

	$("#txtUsuarios_Crear_nUsuario").on("change", function()
	{
		$(this).val(NumText($(this).val()));
	});

	usuarios_CargarParametros();

	var vFrmUsuarios_Crear = false;

	$("#frmUsuarios_Crear").on("submit", function(evento)
	{
		evento.preventDefault();

		if (!vFrmUsuarios_Crear)
		{
			vFrmUsuarios_Crear = true;
			if ($("#txtUsuarios_Crear_Nombre").val() == '')
			{
				Mensaje("Error", 'Es importante poner un Nombre', 'danger');
				vFrmUsuarios_Crear = false;
			} else
			{
				if ($("#txtUsuarios_Crear_Clave").val() != $("#txtUsuarios_Crear_Clave2").val())
				{
					Mensaje("Error", 'Las contraseñas deben coincidir', 'danger');
					$("#txtUsuarios_Crear_Clave").focus();
					vFrmUsuarios_Crear = false;
				} else
				{
					if ($("#txtUsuarios_Crear_Correo").val() == '')
					{
						Mensaje("Error", 'Es importante poner un correo de Contacto', 'danger');
						$("#txtUsuarios_Crear_Correo").focus();
						vFrmUsuarios_Crear = false;
					} else
					{
						if ($("#txtUsuarios_Crear_idEmpresa").val() == '')
						{
							Mensaje("Error", 'Es importante seleccionar una empresa', 'danger');
							$("#txtUsuarios_Crear_idEmpresa").focus();
							vFrmUsuarios_Crear = false;
						} else
						{
							if ($("#txtUsuarios_Crear_idPerfil").val() == '')
							{
								Mensaje("Error", 'Es importante seleccionar un Perfil', 'danger');
								$("#txtUsuarios_Crear_idPerfil").focus();
								vFrmUsuarios_Crear = false;
							} else
							{
								if ($("#txtUsuarios_Crear_nUsuario").val() == '')
								{
									Mensaje("Error", 'No puedes dejar el Usuario vacío', 'danger');
									$("#txtUsuarios_Crear_nUsuario").focus();
									vFrmUsuarios_Crear = false;
								} else
								{
									if ($("#txtUsuarios_Crear_Clave").val().length < 8)
									{
										Mensaje("Error", 'La clave debe ser de mínimo 8 caracteres', 'danger');
										$("#txtUsuarios_Crear_Clave").focus();
										vFrmUsuarios_Crear = false;
									} else
									{
										$("#frmUsuarios_Crear").generarDatosEnvio("txtUsuarios_Crear_", function(datos)
										{
											datos = JSON.parse(datos);
											vFrmUsuarios_Crear = false;
											$.post('../server/php/proyecto/Usuarios_Crear.php', datos, function(data, textStatus, xhr) 
											{
												vFrmUsuarios_Crear = false;
												if (!isNaN(data))
												{
													Mensaje("Hey", "Los datos han sido ingresados", "success");
													$("#txtUsuarios_Crear_id").val(data);
													$("#frmUsuarios_Buscar").trigger('submit');
												} else
												{
													Mensaje("Error", data, "danger");
													vFrmUsuarios_Crear = false;
												}
											});
										});
									}
								}
							}
						}
					}
				}
			}
		}

	});

	$("#frmUsuarios_Buscar").on("submit", function(evento)
	{
		evento.preventDefault();

		$("#tblUsuarios_Listado").slideDown();

		$("#tblUsuarios_Listado li").remove();


		$.post('../server/php/proyecto/Usuarios_Buscar.php', {Usuario : Usuario.id, Parametro : $("#txtReportes_OT_Buscar").val()}, function(data, textStatus, xhr) 
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
					tmpEstadoid = 'Inactivo';

					if (val.Estado == 'Inactivo')
					{
						tmpEstado = 'away';
						tmpEstadoLabel = 'Activar';
						tmpEstadoIcon = 'play';
						tmpEstadoid = 'Activo';
					} 

					tds += '<li class="list-group-item">';
	                    tds += '<div class="media">';
	                      tds += '<div class="media-left">';
	                        tds += '<div class="avatar avatar-' + tmpEstado + '">';
	                          tds += '<img src="../assets/portraits/5.png" alt="...">';
	                          tds += '<i class="avatar avatar-' + tmpEstado + '"></i>';
	                        tds += '</div>';
	                      tds += '</div>';
	                      tds += '<div class="media-body">';
	                        tds += '<h4 class="media-heading">';
	                          tds += '<span>' + val.Nombre + '</span>';
	                          tds += '<small> ' + val.fechaCargue + '</small>';
	                        tds += '</h4>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color fa-credit-card" aria-hidden="true"></i>' + val.Cargo;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color wb-envelope" aria-hidden="true"></i><a href="mailto:' + val.Correo + '">' + val.Correo + '</a>';
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color fa-user" aria-hidden="true"></i>' + val.Usuario;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6" idPerfil="' + val.idPerfil + '" idEmpresa="' + val.idEmpresa + '">';
	                          tds += '<small>' + val.Perfil +'</small> ' + val.Empresa;
	                        tds += '</p>';
	                      tds += '</div>';
	                      tds += '<div class="media-footer">';
	                        tds += '<button type="button" idUsuario="' + val.idLogin + '"class="btn btn-outline btn-info btn-sm col-md-2 margin-left-5 btnUsuarios_Editar"><i class="icon wb-edit"></i>Editar</button>';
	                        tds += '<button type="button" idUsuario="' + val.idLogin + '"class="btn btn-outline btn-warning btn-sm col-md-2 margin-left-5 btnUsuarios_Activacion" idEstado="' + tmpEstadoid + '"><i class="icon wb-' + tmpEstadoIcon + '"></i>' + tmpEstadoLabel + '</button>';
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

			$("#tblUsuarios_Listado").append(tds);

		}, 'json').always(function() { l.stop(); });
	});

	$(document).delegate('.btnUsuarios_Abrir', 'click', function(evento)
		{
			evento.preventDefault();
			var contenedor = $(this).parent("div").parent('div');
			var tmp = $(contenedor).find("img").attr("src");
			$(".imgLogoUsuario").attr("src", tmp);
			
			tmp = $(contenedor).find(".media-heading").find("span");
			$(".lblUsuario_Nombre").text($(tmp).text());
			
			tmp = $(contenedor).find(".media-body").find("p");

			$(".lblUsuario_Direccion").text($(tmp[0]).text());
			$(".lblUsuario_Telefono").text($(tmp[2]).text());
			$(".lblUsuario_Responsable").text($(tmp[1]).text());

			tmp = $(this).attr("idUsuario");

			$("#txtInicio_idUsuario").val(tmp);

			cargarModulo("Inicio.html", 'Inicio');
		});

	$(document).delegate('.btnUsuarios_Activacion', 'click', function(event) 
	{
		event.preventDefault();

		var idEstado = $(this).attr("idEstado");
		var idUsuario = $(this).attr("idUsuario");

		var tmpEstado = 'Desactivar';

		if (idEstado == 'Activo')
		{
			tmpEstado = 'Activar';
		}

		if (idEstado == 'Inactivo')
		{
			tmpEstado = 'Desactivar';
		}

		bootbox.confirm({
        message: "Estas seguro de " + tmpEstado + " este Usuario?",
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
			$.post('../server/php/proyecto/Usuarios_CambiarEstado.php', 
				{
					Usuario : Usuario.id,
					idEstado : idEstado,
					idUsuario : idUsuario
				}, function(data, textStatus, xhr) 
				{
					if (data == 1)
					{
						$("#frmUsuarios_Buscar").trigger('submit');
					} else
					{
						Mensaje("Error", data, "danger");
					}
				});
          }
        }
      });

	});

	$(document).delegate('.btnUsuarios_Editar', 'click', function(event) 
	{
		event.preventDefault();

		var idUsuario = $(this).attr("idUsuario");

		$("#btnUsuarios_CrearUsuario").trigger('click');

		$("#lblUsuarios_Creacion_Titulo").text('Editar Usuario');
		
		$("#btnEmpresas_Crear_Borrar").show();

		$("#txtUsuarios_Crear_id").val(idUsuario);

		var contenedor = $(this).parent("div").parent('div');
		var tmp = $(contenedor).find("img").attr("src");
		$("#imgEmpresas_Crear_Preview").attr('src', tmp);
		
		tmp = $(contenedor).find(".media-heading").find("span");
		$("#txtUsuarios_Crear_Nombre").val($(tmp).text());
		
		tmp = $(contenedor).find(".media-body").find("p");

		$("#txtUsuarios_Crear_Cargo").val($(tmp[0]).text());
		$("#txtUsuarios_Crear_Correo").val($(tmp[1]).text());
		$("#txtUsuarios_Crear_nUsuario").val($(tmp[2]).text());
		$("#txtUsuarios_Crear_Clave").val('************');
		$("#txtUsuarios_Crear_Clave2").val('************');

		$("#txtUsuarios_Crear_idPerfil").val($(tmp[3]).attr("idPerfil"));
		$("#txtUsuarios_Crear_idEmpresa").val($(tmp[3]).attr("idEmpresa"));
		

		tmp = $(this).attr("idEmpresa");
		$("#txtEmpresas_Crear_id").val(tmp);
	});
});

function usuarios_CargarParametros()
{
	$("#txtUsuarios_Crear_idEmpresa").optCargarParametro(
	{
		Parametro : '',
		url : 'Empresas_Cargar.php'
	});



	$("#txtUsuarios_Crear_idPerfil").optCargarParametro(
	{
		Parametro : '',
		url : 'Perfiles_Cargar.php'
	});
}