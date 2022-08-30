SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';



create table cliente(
    codigo int NOT NULL AUTO_INCREMENT,
    primer_nombre varchar(32) NOT NULL,
    segundo_nombre varchar(32),
    apellido_paterno varchar(32),
    apellido_materno varchar(32),
    telefono varchar(16),
    PRIMARY KEY (codigo)
);

create table carro(
    codigo int NOT NULL AUTO_INCREMENT,
    placa varchar(8) NOT NULL,
    codigo_cliente int,
    PRIMARY KEY (codigo),
    FOREIGN KEY (codigo_cliente) REFERENCES cliente(codigo)
    ON DELETE CASCADE
);

create table orden(
    codigo int NOT NULL AUTO_INCREMENT,
    consumo_total float(8,2),
    fecha date,
    hora time,
    codigo_cliente int,
    PRIMARY KEY (codigo),
    FOREIGN KEY (codigo_cliente) REFERENCES cliente(codigo)
    ON DELETE SET NULL
);

create table servicio(
    codigo int NOT NULL AUTO_INCREMENT,
    nombre varchar(64) NOT NULL, 
    descripcion varchar(256),
    costo float(8,2),
    PRIMARY KEY (codigo)
);

create table orden_servicio(
    codigo int NOT NULL AUTO_INCREMENT,
    codigo_orden int,
    codigo_servicio int,
    codigo_auto int,
    PRIMARY KEY (codigo),
    FOREIGN KEY (codigo_orden) REFERENCES orden(codigo)
    ON DELETE CASCADE,
    FOREIGN KEY (codigo_servicio) REFERENCES servicio(codigo)
    ON DELETE SET NULL,
    FOREIGN KEY (codigo_auto) REFERENCES carro(codigo)
    ON DELETE SET NULL
);

create table trabajador(
    codigo int NOT NULL AUTO_INCREMENT,
    primer_nombre varchar(32) NOT NULL,
    segundo_nombre varchar(32),
    apellido_paterno varchar(32),
    apellido_materno varchar(32),
    telefono varchar(16),
    descripcion varchar(64),
    sueldo float(8,2),
    PRIMARY KEY (codigo)
);

-- create table informacion_trabajador(
--     codigo int NOT NULL AUTO_INCREMENT,
--     faltas int,
--     fecha_inicio date,
--     fecha_fin date,
--     adelanto float(8,2),
--     codigo_trabajador int,
--     PRIMARY KEY (codigo),
--     FOREIGN KEY (codigo_trabajador) REFERENCES trabajador(codigo)
--     ON DELETE CASCADE
-- );

create table bono(
    codigo int NOT NULL AUTO_INCREMENT,
    cantidad float(8,2),
    descripcion varchar(128),
    fecha date,
    codigo_trabajador int,
    PRIMARY KEY (codigo),
    FOREIGN KEY (codigo_trabajador) REFERENCES trabajador(codigo)
    ON DELETE SET NULL
);

create table adelanto(
    codigo int NOT NULL AUTO_INCREMENT,
    cantidad float(8,2),
    descripcion varchar(128),
    fecha date,
    codigo_trabajador int,
    PRIMARY KEY (codigo),
    FOREIGN KEY (codigo_trabajador) REFERENCES trabajador(codigo)
    ON DELETE SET NULL
);


create table asistencia_trabajador(
    codigo int NOT NULL AUTO_INCREMENT,
    asistio boolean,
    hora_inicio time,
    hora_fin time,
    fecha date,
    codigo_trabajador int,
    PRIMARY KEY (codigo),
    FOREIGN KEY (codigo_trabajador) REFERENCES trabajador(codigo)
    ON DELETE CASCADE
);


create table proveedor(
    codigo int NOT NULL AUTO_INCREMENT,
    primer_nombre varchar(32) NOT NULL,
    segundo_nombre varchar(32),
    apellido_paterno varchar(32),
    apellido_materno varchar(32),
    telefono varchar(16),
    empresa varchar(64),
    descripcion varchar(256),
    PRIMARY KEY (codigo)
);

create table requerimiento(
    codigo int NOT NULL AUTO_INCREMENT,
    descripcion varchar(256),
    urgencia varchar(1),
    pedido varchar(512),
    costo float(8,2),
    fecha_pedido date,
    fecha_entrega date,
    estado boolean,
    codigo_proveedor int,
    PRIMARY KEY (codigo),
    FOREIGN KEY (codigo_proveedor) REFERENCES proveedor(codigo)
    ON DELETE SET NULL
);



create table flujo_de_caja(
    codigo int NOT NULL AUTO_INCREMENT,
    descripcion varchar(512),
    valor float(8,2),
    hora time,
    fecha date,
    PRIMARY KEY (codigo)
);


delimiter $$
create procedure showClients(type_order varchar(1), buscar varchar(32))
begin
	declare buscar_v varchar(32);
    set buscar_v = CONCAT(buscar, '%') ;
    	
	IF type_order='1' THEN 
		SELECT cl.* , car.placa, (select count(*) from orden where cl.codigo=codigo_cliente) as orders FROM cliente as cl 
        left JOIN carro as car  on cl.codigo = car.codigo_cliente
        WHERE cl.PRIMER_NOMBRE LIKE buscar_v OR cl.SEGUNDO_NOMBRE LIKE buscar_v OR cl.APELLIDO_PATERNO LIKE buscar_v OR cl.APELLIDO_MATERNO LIKE buscar_v OR cl.telefono LIKE buscar_v OR car.placa LIKE buscar_v
        ORDER BY codigo DESC;
				
    ELSEIF type_order='2' THEN
		SELECT cl.* , car.placa, (select count(*) from orden where cl.codigo=codigo_cliente) as orders FROM cliente as cl 
        left JOIN carro as car  on cl.codigo = car.codigo_cliente
        WHERE cl.PRIMER_NOMBRE LIKE buscar_v OR cl.SEGUNDO_NOMBRE LIKE buscar_v OR cl.APELLIDO_PATERNO LIKE buscar_v OR cl.APELLIDO_MATERNO LIKE buscar_v OR cl.telefono LIKE buscar_v OR car.placa LIKE buscar_v
		ORDER BY APELLIDO_PATERNO ASC;
	
    ELSEIF type_order='3' THEN
		SELECT cl.* , car.placa, (select count(*) from orden where cl.codigo=codigo_cliente) as orders FROM cliente as cl 
        left JOIN carro as car  on cl.codigo = car.codigo_cliente
        WHERE cl.PRIMER_NOMBRE LIKE buscar_v OR cl.SEGUNDO_NOMBRE LIKE buscar_v OR cl.APELLIDO_PATERNO LIKE buscar_v OR cl.APELLIDO_MATERNO LIKE buscar_v OR cl.telefono LIKE buscar_v OR car.placa LIKE buscar_v
		ORDER BY PRIMER_NOMBRE ASC;
	
    ELSEIF type_order='4' THEN
		SELECT cl.* , car.placa, (select count(*) from orden where cl.codigo=codigo_cliente) as orders FROM cliente as cl 
        left JOIN carro as car  on cl.codigo = car.codigo_cliente
        WHERE cl.PRIMER_NOMBRE LIKE buscar_v OR cl.SEGUNDO_NOMBRE LIKE buscar_v OR cl.APELLIDO_PATERNO LIKE buscar_v OR cl.APELLIDO_MATERNO LIKE buscar_v OR cl.telefono LIKE buscar_v OR car.placa LIKE buscar_v
		ORDER BY Codigo ASC;
	END IF;
end$$  
delimiter ;


delimiter $$
create procedure showProveedores(type_order varchar(1), buscar varchar(32))
begin
	declare buscar_v varchar(32);
    set buscar_v = CONCAT(buscar, '%') ;
    	
	IF type_order='1' THEN 
		SELECT pr.* , (select count(*) from requerimiento where pr.codigo=codigo_proveedor) as requerimientos FROM proveedor as pr
        WHERE pr.PRIMER_NOMBRE LIKE buscar_v OR pr.SEGUNDO_NOMBRE LIKE buscar_v OR pr.APELLIDO_PATERNO LIKE buscar_v OR pr.APELLIDO_MATERNO LIKE buscar_v OR pr.telefono LIKE buscar_v OR pr.empresa LIKE buscar_v
        ORDER BY codigo DESC;
				
    ELSEIF type_order='2' THEN
		SELECT pr.* , (select count(*) from requerimiento where pr.codigo=codigo_proveedor) as requerimientos FROM proveedor as pr
        WHERE pr.PRIMER_NOMBRE LIKE buscar_v OR pr.SEGUNDO_NOMBRE LIKE buscar_v OR pr.APELLIDO_PATERNO LIKE buscar_v OR pr.APELLIDO_MATERNO LIKE buscar_v OR pr.telefono LIKE buscar_v OR pr.empresa LIKE buscar_v
		ORDER BY APELLIDO_PATERNO ASC;
	
    ELSEIF type_order='3' THEN
		SELECT pr.* , (select count(*) from requerimiento where pr.codigo=codigo_proveedor) as requerimientos FROM proveedor as pr
        WHERE pr.PRIMER_NOMBRE LIKE buscar_v OR pr.SEGUNDO_NOMBRE LIKE buscar_v OR pr.APELLIDO_PATERNO LIKE buscar_v OR pr.APELLIDO_MATERNO LIKE buscar_v OR pr.telefono LIKE buscar_v OR pr.empresa LIKE buscar_v
		ORDER BY PRIMER_NOMBRE ASC;
	
    ELSEIF type_order='4' THEN
		SELECT pr.* , (select count(*) from requerimiento where pr.codigo=codigo_proveedor) as requerimientos FROM proveedor as pr
        WHERE pr.PRIMER_NOMBRE LIKE buscar_v OR pr.SEGUNDO_NOMBRE LIKE buscar_v OR pr.APELLIDO_PATERNO LIKE buscar_v OR pr.APELLIDO_MATERNO LIKE buscar_v OR pr.telefono LIKE buscar_v OR pr.empresa LIKE buscar_v
		ORDER BY Codigo ASC;
        
	ELSEIF type_order='5' THEN
		SELECT pr.* , (select count(*) from requerimiento where pr.codigo=codigo_proveedor) as requerimientos FROM proveedor as pr
        WHERE pr.PRIMER_NOMBRE LIKE buscar_v OR pr.SEGUNDO_NOMBRE LIKE buscar_v OR pr.APELLIDO_PATERNO LIKE buscar_v OR pr.APELLIDO_MATERNO LIKE buscar_v OR pr.telefono LIKE buscar_v OR pr.empresa LIKE buscar_v
		ORDER BY requerimientos DESC;
	END IF;
end$$  
delimiter ;

delimiter $$
create procedure showWorkers(type_order varchar(1), buscar varchar(32))
begin
	declare buscar_v varchar(32);
    set buscar_v = CONCAT(buscar, '%') ;
    	
	IF type_order='1' THEN 
		SELECT tr.* FROM trabajador as tr
        WHERE tr.PRIMER_NOMBRE LIKE buscar_v OR tr.SEGUNDO_NOMBRE LIKE buscar_v OR tr.APELLIDO_PATERNO LIKE buscar_v OR tr.APELLIDO_MATERNO LIKE buscar_v OR tr.telefono LIKE buscar_v OR tr.sueldo LIKE buscar_v
        ORDER BY codigo DESC;
				
    ELSEIF type_order='2' THEN
		SELECT tr.* FROM trabajador as tr
        WHERE tr.PRIMER_NOMBRE LIKE buscar_v OR tr.SEGUNDO_NOMBRE LIKE buscar_v OR tr.APELLIDO_PATERNO LIKE buscar_v OR tr.APELLIDO_MATERNO LIKE buscar_v OR tr.telefono LIKE buscar_v OR tr.sueldo LIKE buscar_v
		ORDER BY APELLIDO_PATERNO ASC;
	
    ELSEIF type_order='3' THEN
		SELECT tr.* FROM trabajador as tr
        WHERE tr.PRIMER_NOMBRE LIKE buscar_v OR tr.SEGUNDO_NOMBRE LIKE buscar_v OR tr.APELLIDO_PATERNO LIKE buscar_v OR tr.APELLIDO_MATERNO LIKE buscar_v OR tr.telefono LIKE buscar_v OR tr.sueldo LIKE buscar_v
		ORDER BY PRIMER_NOMBRE ASC;
	
    ELSEIF type_order='4' THEN
		SELECT tr.* FROM trabajador as tr
        WHERE tr.PRIMER_NOMBRE LIKE buscar_v OR tr.SEGUNDO_NOMBRE LIKE buscar_v OR tr.APELLIDO_PATERNO LIKE buscar_v OR tr.APELLIDO_MATERNO LIKE buscar_v OR tr.telefono LIKE buscar_v OR tr.sueldo LIKE buscar_v
		ORDER BY Codigo ASC;
	
	END IF;
end$$  
delimiter ;


alter table orden add tipo_pago varchar(1);
alter table flujo_de_caja add tipo_pago varchar(1);
alter table requerimiento drop estado;
alter table requerimiento add estado varchar(1);

--drop tables
DROP TABLE cliente;
DROP TABLE carro;
--selects


--inserts
INSERT INTO cliente (primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono)
VALUES ("erick","stefano", "gutierrez", "enriquez", "912828802");

INSERT INTO carro (placa, codigo_cliente)
VALUES("V1D-834", 1);

INSERT INTO orden (consumo_total, fecha, hora, codigo_cliente)
VALUES(12.5, "2022-08-13", "15:03:05",5);

INSERT INTO proveedor (primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, empresa, descripcion)
VALUES ("Alonso","Mauro", "Zeballos", "Quispe", "987134224","Venta de aceites","Empresa con gran calidad pero un alto precio");
INSERT INTO proveedor (primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, empresa, descripcion)
VALUES ("Rodrigo","Jose", "Rojas", "Vargas", "987234224","Venta de limpiadores","Tiene un calidad promedio pero cuenta con precios bajos");

INSERT INTO trabajador (primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, sueldo)
VALUES ("Rodrigo","Jose", "Rojas", "Vargas", "987234224", 1200.00);
INSERT INTO trabajador (primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, sueldo)
VALUES ("Juan","Luis", "Flores", "Torres", "987234224", 1200.00);

INSERT INTO servicio (nombre, descripcion, costo)
values("cambio de aceite","Un cambio completo de aceite del vehiculo", 50.00);
INSERT INTO servicio (nombre, descripcion, costo)
values("Lavado simple","Lavado por fuera del auto con shampoo basico", 15.00);

INSERT INTO requerimiento(descripcion, urgencia, pedido, costo, fecha_pedido, estado, codigo_proveedor)
values("Pedido de aceites","2", "10 aceites de tal marca \n 20 aceites de la otra", 300.00, "2022-06-21", 1, 1);

INSERT INTO bono(cantidad, descripcion, fecha, codigo_trabajador)
VALUES(200.00, "Trabajo sobresaliente",'2022-06-21',2);

INSERT INTO adelanto(cantidad, descripcion, fecha, codigo_trabajador)
VALUES(150.00, "Motivo de salud",'2022-06-30',2);

insert into orden(consumo_total, fecha, hora, codigo_cliente)
values('50.0', '2022-07-22', '13:00', 39);

insert into orden_servicio(codigo_orden, codigo_servicio, codigo_auto)
values(5, 3, 40);
insert into orden_servicio(codigo_orden, codigo_servicio, codigo_auto)
values(5, 2, 40);

--deletes
DELETE FROM carro WHERE carro.codigo = 1;
DELETE FROM cliente AS c WHERE c.codigo = 1;