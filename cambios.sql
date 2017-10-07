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