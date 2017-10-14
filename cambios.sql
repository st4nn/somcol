/**************************************20171003*****************/

ALTER TABLE `Empresas` ADD `colorPrimario` VARCHAR(8) NOT NULL AFTER `Telefono`, ADD `colorSecundario` VARCHAR(8) NOT NULL AFTER `colorPrimario`;

ALTER TABLE `Empresas` ADD `ActividadEconomica` LONGTEXT NOT NULL AFTER `colorSecundario`;

ALTER TABLE `Empresas` ADD `RepresentanteLegal` VARCHAR(150) NOT NULL AFTER `ActividadEconomica`;


/**************************************20171007*****************/

--
-- Estructura de tabla para la tabla `cp_AEC_Candidatos`
--

CREATE TABLE `cp_AEC_Candidatos` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Anio` int(11) NOT NULL,
  `Nombre` varchar(120) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  `Identificacion` varchar(25) NOT NULL,
  `Votos` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cp_AEC_Candidatos`
--
ALTER TABLE `cp_AEC_Candidatos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cp_AEC_Candidatos`
--
ALTER TABLE `cp_AEC_Candidatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;



ALTER TABLE `cp_AEC_Candidatos` ADD `Tipo` VARCHAR(15) NOT NULL AFTER `Anio`;
  


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cp_AEC`
--

CREATE TABLE `cp_AEC` (
  `id` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idUsuario` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `Anio` int(11) NOT NULL,
  `Responsable_SGSST` varchar(120) NOT NULL,
  `Responsable_SGSST_Cargo` varchar(45) NOT NULL,
  `Fecha_Apertura` date NOT NULL,
  `Fecha_Cierre` date NOT NULL,
  `Trabajadores_Directos` int(11) NOT NULL,
  `Fecha_Elecciones` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cp_AEC`
--
ALTER TABLE `cp_AEC`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cp_AEC`
--
ALTER TABLE `cp_AEC`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;


ALTER TABLE `cp_AEC` ADD UNIQUE (`idEmpresa`, `Anio`);

/**************************************20171014*****************/

ALTER TABLE `Empresas` ADD `NIT` VARCHAR(25) NOT NULL AFTER `Nombre`;

INSERT INTO `Perfiles` (`idPerfil`, `Nombre`) VALUES ('2', 'Coordinador por Empresa');

ALTER TABLE `cp_AEC_Candidatos` ADD `Posicion` VARCHAR(25) NOT NULL DEFAULT 'Candidato' AFTER `Votos`;

ALTER TABLE `cp_AEC_Candidatos` CHANGE `Posicion` `Posicion` VARCHAR(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Candidato';


--
-- Estructura de tabla para la tabla `cp_Actas`
--

CREATE TABLE `cp_Actas` (
  `id` int(11) NOT NULL,
  `Anio` int(11) NOT NULL,
  `NoActa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Lugar` varchar(120) NOT NULL,
  `Fecha` date NOT NULL,
  `Departamento` varchar(65) NOT NULL,
  `Municipio` varchar(65) NOT NULL,
  `Referencia` varchar(120) NOT NULL,
  `Objetivo` longtext NOT NULL,
  `Temas` longtext NOT NULL,
  `Desarrollo` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cp_Actas`
--
ALTER TABLE `cp_Actas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Anio` (`Anio`,`NoActa`,`idEmpresa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cp_Actas`
--
ALTER TABLE `cp_Actas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;


--
-- Estructura de tabla para la tabla `cp_Actas_Asistentes`
--

CREATE TABLE `cp_Actas_Asistentes` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NoActa` int(11) NOT NULL,
  `Anio` int(11) NOT NULL,
  `Nombre` varchar(120) NOT NULL,
  `Cargo` varchar(85) NOT NULL,
  `Telefono` varchar(25) NOT NULL,
  `Correo` varchar(85) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cp_Actas_Asistentes`
--
ALTER TABLE `cp_Actas_Asistentes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cp_Actas_Asistentes`
--
ALTER TABLE `cp_Actas_Asistentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;



--
-- Estructura de tabla para la tabla `cp_Actas_Compromisos`
--

CREATE TABLE `cp_Actas_Compromisos` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NoActa` int(11) NOT NULL,
  `Anio` int(11) NOT NULL,
  `Descripcion` longtext NOT NULL,
  `Responsable` varchar(120) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cp_Actas_Compromisos`
--
ALTER TABLE `cp_Actas_Compromisos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cp_Actas_Compromisos`
--
ALTER TABLE `cp_Actas_Compromisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

ALTER TABLE `cp_Actas_Compromisos` ADD `fechaCumplimiento` DATE NOT NULL AFTER `Fecha`;


--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Cedula` varchar(25) NOT NULL,
  `Nombres` varchar(85) NOT NULL,
  `Apellidos` varchar(85) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Genero` varchar(5) NOT NULL,
  `Cargo` varchar(135) NOT NULL,
  `Grupo` varchar(45) NOT NULL,
  `Regional` varchar(130) NOT NULL,
  `NombreEPS` varchar(85) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;
