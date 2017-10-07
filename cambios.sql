/**************************************20171003*****************/

ALTER TABLE `Empresas` ADD `colorPrimario` VARCHAR(8) NOT NULL AFTER `Telefono`, ADD `colorSecundario` VARCHAR(8) NOT NULL AFTER `colorPrimario`;

ALTER TABLE `Empresas` ADD `ActividadEconomica` LONGTEXT NOT NULL AFTER `colorSecundario`;

ALTER TABLE `Empresas` ADD `RepresentanteLegal` VARCHAR(150) NOT NULL AFTER `ActividadEconomica`;