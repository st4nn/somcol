-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-10-2017 a las 17:17:18
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 5.5.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `somcol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Archivos`
--

CREATE TABLE `Archivos` (
  `id` int(11) NOT NULL,
  `idlogin` int(11) NOT NULL,
  `Prefijo` bigint(20) NOT NULL,
  `Ruta` longtext,
  `Nombre` varchar(255) DEFAULT NULL,
  `Observaciones` longtext NOT NULL,
  `Proceso` varchar(45) DEFAULT NULL,
  `FechaCargue` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosUsuarios`
--

CREATE TABLE `datosUsuarios` (
  `idLogin` int(11) NOT NULL,
  `Nombre` varchar(120) NOT NULL,
  `Correo` varchar(80) NOT NULL,
  `idPerfil` int(11) NOT NULL,
  `idSede` int(11) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `datosUsuarios`
--

INSERT INTO `datosUsuarios` (`idLogin`, `Nombre`, `Correo`, `idPerfil`, `idSede`, `Cargo`, `fechaCargue`) VALUES
(1, 'Jh', 'jhonathan2@gmail.com', 1, 0, 'Admin', '2017-09-11 14:19:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Empresas`
--

CREATE TABLE `Empresas` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Direccion` mediumint(9) NOT NULL,
  `Correo` varchar(85) NOT NULL,
  `Telefono` int(45) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `Estado` int(11) NOT NULL DEFAULT '1' COMMENT '{0 = Borrado, 1 = Activo, 2 = Suspendido}',
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Empresas`
--

INSERT INTO `Empresas` (`id`, `Nombre`, `Direccion`, `Correo`, `Telefono`, `idUsuario`, `Estado`, `fechaCargue`) VALUES
(1, 'Soporte', 0, '', 0, 1, 1, '2017-07-09 17:02:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Funciones`
--

CREATE TABLE `Funciones` (
  `id` int(11) NOT NULL,
  `Descripcion` longtext NOT NULL,
  `control` varchar(85) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Login`
--

CREATE TABLE `Login` (
  `idLogin` int(11) NOT NULL,
  `Usuario` varchar(45) NOT NULL,
  `Clave` varchar(45) NOT NULL,
  `Estado` varchar(45) NOT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Login`
--

INSERT INTO `Login` (`idLogin`, `Usuario`, `Clave`, `Estado`, `idEmpresa`, `fechaCargue`) VALUES
(1, 'admin', 'dab4ec27e4772948284b13606a5a61a9', 'Activo', 1, '2017-02-02 05:20:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Perfiles`
--

CREATE TABLE `Perfiles` (
  `idPerfil` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Perfiles`
--

INSERT INTO `Perfiles` (`idPerfil`, `Nombre`) VALUES
(1, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Perfiles_hasnot_Funciones`
--

CREATE TABLE `Perfiles_hasnot_Funciones` (
  `idPerfil` int(11) NOT NULL,
  `idFuncion` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Archivos`
--
ALTER TABLE `Archivos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `datosUsuarios`
--
ALTER TABLE `datosUsuarios`
  ADD PRIMARY KEY (`idLogin`);

--
-- Indices de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Funciones`
--
ALTER TABLE `Funciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Login`
--
ALTER TABLE `Login`
  ADD PRIMARY KEY (`idLogin`),
  ADD UNIQUE KEY `Loign_uni` (`Usuario`,`idEmpresa`);

--
-- Indices de la tabla `Perfiles`
--
ALTER TABLE `Perfiles`
  ADD PRIMARY KEY (`idPerfil`);

--
-- Indices de la tabla `Perfiles_hasnot_Funciones`
--
ALTER TABLE `Perfiles_hasnot_Funciones`
  ADD UNIQUE KEY `idPerfil` (`idPerfil`,`idFuncion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Archivos`
--
ALTER TABLE `Archivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `Funciones`
--
ALTER TABLE `Funciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `Login`
--
ALTER TABLE `Login`
  MODIFY `idLogin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `Perfiles`
--
ALTER TABLE `Perfiles`
  MODIFY `idPerfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
