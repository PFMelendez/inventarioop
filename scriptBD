create database Inventario_OP; 
use Inventario_OP;
CREATE TABLE `inventario_op`.`usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a un nuevo usuario',
  `nombre` VARCHAR(25) NOT NULL COMMENT 'Nombre del usuario',
  `apellidos` VARCHAR(40) NOT NULL COMMENT 'Los apellidos del usuario',
  `correo` VARCHAR(50) NOT NULL COMMENT 'Correo electronico del usuario',
  `telefono` VARCHAR(14) NOT NULL COMMENT 'Nunero telefonico del usuario',
  `contraseña` VARCHAR(10) NOT NULL COMMENT 'Contraseña del usuario para logeo',
  `nombre_usuario` VARCHAR(40) NOT NULL COMMENT 'Nomre de usuario para logueo',
  `fecha_crecion` DATE NOT NULL COMMENT 'Fecha de cracion de usuario, fomato YYYY-MM-DD',
  `fecha_actualizacion` DATE NOT NULL COMMENT 'Fecha de ultimo movimiento',
  `cargo_Usuario` VARCHAR(14) NOT NULL COMMENT 'Clasificacion del usuario,capturiasta o encargado de inventario',
  `estado` VARCHAR(25) NOT NULL COMMENT 'Informa el estado actual del usuario',
  PRIMARY KEY (`idUsuarios`),
  UNIQUE INDEX `idUsuarios_UNIQUE` (`idUsuarios` ASC) VISIBLE)
COMMENT = 'Tabla para Guardar la informacion de los usarios del sistema';

CREATE TABLE `inventario_op`.`objetos` (
  `idObjetos` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada a un nuevo usuario',
  `fecha_ingreso` DATETIME NOT NULL COMMENT 'Fecha de ingrso del objeto, fomato YYYY-MM-DD-HH:MM:SS',
  `fecha_egreso` DATETIME NOT NULL COMMENT 'Fecha de salida del objeto, fomato YYYY-MM-DD-HH:MM:SS',
  `lugar_hallazgo` VARCHAR(25) NOT NULL COMMENT 'Nombre del Area donde se encontro el objeto',
  `etiquetas` INT NOT NULL COMMENT 'Llave foranea para las etiquetas de caracteristicas',
  `informacion_adicional` VARCHAR(100) NOT NULL COMMENT 'Datos extra sobre el objeto al entrar al inventario',
  `usuario_encontro` INT NOT NULL COMMENT 'Llave foranea al tipo de usuario que encotro el objeto',
  `usuario_recibio` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que recibio el objeto en almacen',
  `usuario_registro_entrada` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que registro el objeto en el sistema',
  `usuario_registro_salida` INT NOT NULL COMMENT 'Llave foranea  al tipo de usuario que registro la sealida del objeto',
  `estado` VARCHAR(25) NOT NULL COMMENT 'Informa el estado actual del objeto',
  PRIMARY KEY (`idObjetos`),
  UNIQUE INDEX `idObjetos_UNIQUE` (`idObjetos` ASC) VISIBLE)
COMMENT = 'Tabla para guardar la informacion de los objetos perdidos registrados en el sistema';

CREATE TABLE `inventario_op`.`TipoUsuario` (
  `idTipoUsuario` INT NOT NULL AUTO_INCREMENT COMMENT 'Id auto asignada cada tipo de usuario',
  `NombreTipoUsuario` VARCHAR(25) NOT NULL COMMENT 'Nombre de tipo de Usuario',
  `DatosTipousuario` VARCHAR(50) NOT NULL COMMENT 'Campo para escribir datos para contactar al tipo de usuario',
  `Devolucio` BINARY  NOT NULL COMMENT 'Campo que nos permitira saber si a este usuario se le puede regresar el objeto que entrego',
  PRIMARY KEY (`idTipoUsuario`),
  UNIQUE INDEX `idTipoUsuario_UNIQUE` (`idTipoUsuario` ASC) VISIBLE)
COMMENT = 'Tabla para englobar los ipos de usuario';

use Inventario_OP;
ALTER TABLE objetos ADD FOREIGN KEY(usuario_recibio) REFERENCES TipoUsuario(idTipoUsuario);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_registro_entrada) REFERENCES TipoUsuario(idTipoUsuario);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_registro_salida) REFERENCES TipoUsuario(idTipoUsuario);
ALTER TABLE objetos ADD FOREIGN KEY(usuario_encontro) REFERENCES TipoUsuario(idTipoUsuario);
