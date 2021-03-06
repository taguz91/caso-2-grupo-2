-- Definitions 
-- Types:
-- 1: impacto
-- 2: nivelprioridad
-- 3: estados
-- 4: tipoServicios
-- 5: mediosComunicacion
-- 
-- Insert data into parametros
-- 
-- Insert impactos 
UPDATE
  parametros
SET
  type = 1,
  nombre = 'Alto Impacto',
  descripcion = 'Afecta a activos de información considerados de impacto catastrófico y mayor que influyen directamente a los objetivos misionales del Instituto. Estos incidentes deben tener respuesta inmediata.'
WHERE
  parametros_id = 1;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  1,
  1,
  'Alto Impacto',
  'Afecta a activos de información considerados de impacto catastrófico y mayor que influyen directamente a los objetivos misionales del Instituto. Estos incidentes deben tener respuesta inmediata.'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 1
  );

UPDATE
  parametros
SET
  type = 1,
  nombre = 'Medio Impacto',
  descripcion = 'Afecta a activos de información considerados de impacto moderado que influyen directamente a los objetivos de un proceso determinado'
WHERE
  parametros_id = 2;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  2,
  1,
  'Medio Impacto',
  'Afecta a activos de información considerados de impacto moderado que influyen directamente a los objetivos de un proceso determinado'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 2
  );

UPDATE
  parametros
SET
  type = 1,
  nombre = 'Bajo Impacto',
  descripcion = 'El incidente de seguridad afecta a activos de información considerados de impacto menor e insignificante, que no influyen en ningún objetivo. Estos incidentes deben ser monitoreados con el fin de evitar un cambio en el impacto.'
WHERE
  parametros_id = 3;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  3,
  1,
  'Medio Impacto',
  'El incidente de seguridad afecta a activos de información considerados de impacto menor e insignificante, que no influyen en ningún objetivo. Estos incidentes deben ser monitoreados con el fin de evitar un cambio en el impacto.'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 3
  );

-- Insert nivelPrioridad 
UPDATE
  parametros
SET
  type = 2,
  nombre = 'Inferior',
  descripcion = '3 horas'
WHERE
  parametros_id = 4;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  4,
  2,
  'Inferior',
  '3 horas'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 4
  );

UPDATE
  parametros
SET
  type = 2,
  nombre = 'Bajo',
  descripcion = '1 horas'
WHERE
  parametros_id = 5;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  5,
  2,
  'Bajo',
  '1 horas'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 5
  );

UPDATE
  parametros
SET
  type = 2,
  nombre = 'Medio',
  descripcion = '30 min'
WHERE
  parametros_id = 6;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  6,
  2,
  'Medio',
  '30 min'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 6
  );

UPDATE
  parametros
SET
  type = 2,
  nombre = 'Alto',
  descripcion = '15 min'
WHERE
  parametros_id = 7;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  7,
  2,
  'Medio',
  '15 min'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 7
  );

UPDATE
  parametros
SET
  type = 2,
  nombre = 'Alto',
  descripcion = '15 min'
WHERE
  parametros_id = 7;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  7,
  2,
  'Alto',
  '15 min'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 7
  );

UPDATE
  parametros
SET
  type = 2,
  nombre = 'Superior',
  descripcion = '5 min'
WHERE
  parametros_id = 8;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  8,
  2,
  'Superior',
  '5 min'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 8
  );

-- Insert estados
UPDATE
  parametros
SET
  type = 3,
  nombre = 'Abierto',
  descripcion = 'Ticket ingresado por el usuario que registra el incidente'
WHERE
  parametros_id = 9;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  9,
  3,
  'Abierto',
  'Ticket ingresado por el usuario que registra el incidente'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 9
  );

UPDATE
  parametros
SET
  type = 3,
  nombre = 'Atendiéndose',
  descripcion = 'Ticket recibido por el agente y que se encuentra en atención'
WHERE
  parametros_id = 10;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  10,
  3,
  'Atendiéndose',
  'Ticket recibido por el agente y que se encuentra en atención'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 10
  );

UPDATE
  parametros
SET
  type = 3,
  nombre = 'Rechazado',
  descripcion = 'Ticket rechazado por el usuario'
WHERE
  parametros_id = 11;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  11,
  3,
  'Rechazado',
  'Ticket rechazado por el usuario'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 11
  );

UPDATE
  parametros
SET
  type = 3,
  nombre = 'Cerrado sin solución',
  descripcion = 'Ticket cerrado por el agente sin solución'
WHERE
  parametros_id = 13;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  13,
  3,
  'Cerrado sin solución',
  'Ticket cerrado por el agente sin solución'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 13
  );

UPDATE
  parametros
SET
  type = 3,
  nombre = 'Cerrado con solución',
  descripcion = 'Ticket cerrado con la confirmación del usuario final'
WHERE
  parametros_id = 14;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  14,
  3,
  'Cerrado con solución',
  'Ticket cerrado con la confirmación del usuario final'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 14
  );

-- Insert tiposServicios
UPDATE
  parametros
SET
  type = 4,
  nombre = 'Incidente',
  descripcion = 'Un incidente de acuerdo a ITIL es cualquier evento que interrumpa el funcionamiento normal de un servicio afectando ya sea a uno, a un grupo o a todos los usuarios de un servicio, un incidente se puede tomar como la reducción en la calidad de un servicio IT'
WHERE
  parametros_id = 15;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  15,
  4,
  'Incidente',
  'Un incidente de acuerdo a ITIL es cualquier evento que interrumpa el funcionamiento normal de un servicio afectando ya sea a uno, a un grupo o a todos los usuarios de un servicio, un incidente se puede tomar como la reducción en la calidad de un servicio IT'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 15
  );

UPDATE
  parametros
SET
  type = 4,
  nombre = 'Requerimiento',
  descripcion = 'Indica una solicitud de servicio, en primer lugar, no es una interrupción de un servicio, por lo general (pero no necesariamente) es una solicitud de algo nuevo, como información o acceso; puede tomarse como una petición de un usuario solicitando información, asesoramiento, un cambio estándar o acceso a un servicio IT.'
WHERE
  parametros_id = 16;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  16,
  4,
  'Requerimiento',
  'Indica una solicitud de servicio, en primer lugar, no es una interrupción de un servicio, por lo general (pero no necesariamente) es una solicitud de algo nuevo, como información o acceso; puede tomarse como una petición de un usuario solicitando información, asesoramiento, un cambio estándar o acceso a un servicio IT.'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 16
  );

-- Insert mediosComunicacion
UPDATE
  parametros
SET
  type = 5,
  nombre = 'Correo',
  descripcion = ''
WHERE
  parametros_id = 17;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  17,
  5,
  'Correo',
  ''
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 17
  );

UPDATE
  parametros
SET
  type = 5,
  nombre = 'Celular',
  descripcion = ''
WHERE
  parametros_id = 18;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  18,
  5,
  'Celular',
  ''
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 18
  );

UPDATE
  parametros
SET
  type = 5,
  nombre = 'Teléfono Oficina',
  descripcion = ''
WHERE
  parametros_id = 19;

INSERT INTO
  parametros (parametros_id, type, nombre, descripcion)
SELECT
  19,
  5,
  'Teléfono Oficina',
  ''
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      parametros
    WHERE
      parametros_id = 19
  );

-- Insert the roles 
UPDATE
  roles
SET
  nombre = 'Developer'
WHERE
  rol_id = 1;

INSERT INTO
  roles (rol_id, nombre)
SELECT
  1,
  'Developer'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      roles
    WHERE
      rol_id = 1
  );

UPDATE
  roles
SET
  nombre = 'Admin'
WHERE
  rol_id = 2;

INSERT INTO
  roles (rol_id, nombre)
SELECT
  2,
  'Admin'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      roles
    WHERE
      rol_id = 2
  );

UPDATE
  roles
SET
  nombre = 'Usuario'
WHERE
  rol_id = 3;

INSERT INTO
  roles (rol_id, nombre)
SELECT
  3,
  'Usuario'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      roles
    WHERE
      rol_id = 3
  );

UPDATE
  roles
SET
  nombre = 'Coordinador'
WHERE
  rol_id = 4;

INSERT INTO
  roles (rol_id, nombre)
SELECT
  4,
  'Coordinador'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      roles
    WHERE
      rol_id = 4
  );

UPDATE
  roles
SET
  nombre = 'Soporte N1'
WHERE
  rol_id = 5;

INSERT INTO
  roles (rol_id, nombre)
SELECT
  5,
  'Soporte N1'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      roles
    WHERE
      rol_id = 5
  );

UPDATE
  roles
SET
  nombre = 'Soporte N2'
WHERE
  rol_id = 6;

INSERT INTO
  roles (rol_id, nombre)
SELECT
  6,
  'Soporte N2'
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      roles
    WHERE
      rol_id = 6
  );

-- Insert the developers 
UPDATE
  public.usuarios
SET
  usuario_id = 1,
  apellidos = 'Garcia',
  correo = 'jhonny.garcia.est@tecazuay.edu.ec',
  nombres = 'Johnny',
  password = '$2a$10$aQbYlYAvnVJgRZhbTk2IQuTMqatvhpXIw814uiRbBe7RUeEX14k66',
  telefono = '0968696010',
  rol_id = 1
WHERE
  correo = 'jhonny.garcia.est@tecazuay.edu.ec';

INSERT INTO
  public.usuarios(
    usuario_id,
    apellidos,
    correo,
    nombres,
    password,
    telefono,
    rol_id
  )
SELECT
  1,
  'Garcia',
  'jhonny.garcia.est@tecazuay.edu.ec',
  'Johnny',
  '$2a$10$aQbYlYAvnVJgRZhbTk2IQuTMqatvhpXIw814uiRbBe7RUeEX14k66',
  '0968796010',
  1
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.usuarios
    WHERE
      correo = 'jhonny.garcia.est@tecazuay.edu.ec'
  );

-- Insert admin
UPDATE
  public.usuarios
SET
  usuario_id = 2,
  apellidos = 'Johnny',
  correo = 'admin@dev.tec',
  nombres = 'Admin',
  password = '$2a$10$wU3jucpWdwvXqyPDuurwBOogkb03cllpD9KCbCrzthr/gMECnZg3y',
  telefono = '0968696010',
  rol_id = 2
WHERE
  correo = 'admin@dev.tec';

INSERT INTO
  public.usuarios(
    usuario_id,
    apellidos,
    correo,
    nombres,
    password,
    telefono,
    rol_id
  )
SELECT
  2,
  'Johnny',
  'admin@dev.tec',
  'Admin',
  '$2a$10$wU3jucpWdwvXqyPDuurwBOogkb03cllpD9KCbCrzthr/gMECnZg3y',
  '0968796010',
  2
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.usuarios
    WHERE
      correo = 'admin@dev.tec'
  );

-- Insert default coordinador
UPDATE
  public.usuarios
SET
  usuario_id = 3,
  apellidos = 'Johnny',
  correo = 'coordinador@dev.tec',
  nombres = 'Coordinador',
  password = '$2a$10$o37Hn2myq8MBItWEx5LMT.qTN1mWIAtgGJ66Z6ASgReXtpijusqZ.',
  telefono = '0968696010',
  rol_id = 4
WHERE
  correo = 'coordinador@dev.tec';

INSERT INTO
  public.usuarios(
    usuario_id,
    apellidos,
    correo,
    nombres,
    password,
    telefono,
    rol_id
  )
SELECT
  3,
  'Johnny',
  'coordinador@dev.tec',
  'Coordinador',
  '$2a$10$o37Hn2myq8MBItWEx5LMT.qTN1mWIAtgGJ66Z6ASgReXtpijusqZ.',
  '0968796010',
  4
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.usuarios
    WHERE
      correo = 'coordinador@dev.tec'
  );

-- Insert soporte n1 
UPDATE
  public.usuarios
SET
  usuario_id = 4,
  apellidos = 'Johnny',
  correo = 'soporten1@dev.tec',
  nombres = 'Soporte UNO',
  password = '$2a$10$qOGQyyc/oleg8/VqIpYxmuwOureWXHEe3l4HPFQmCCPxz.5Goaqqa',
  telefono = '0968696010',
  rol_id = 5
WHERE
  correo = 'soporten1@dev.tec';

INSERT INTO
  public.usuarios(
    usuario_id,
    apellidos,
    correo,
    nombres,
    password,
    telefono,
    rol_id
  )
SELECT
  4,
  'Johnny',
  'soporten1@dev.tec',
  'Soporte UNO',
  '$2a$10$qOGQyyc/oleg8/VqIpYxmuwOureWXHEe3l4HPFQmCCPxz.5Goaqqa',
  '0968796010',
  5
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.usuarios
    WHERE
      correo = 'soporten1@dev.tec'
  );

-- Insert soporte n2
UPDATE
  public.usuarios
SET
  usuario_id = 5,
  apellidos = 'Johnny',
  correo = 'soporten2@dev.tec',
  nombres = 'Soporte DOS',
  password = '$2a$10$eOvCA9QHT6J51A.IDO18K.Kh/9yFZB4woTjnSiRspmUlb2HECKmz2',
  telefono = '0968696010',
  rol_id = 6
WHERE
  correo = 'soporten2@dev.tec';

INSERT INTO
  public.usuarios(
    usuario_id,
    apellidos,
    correo,
    nombres,
    password,
    telefono,
    rol_id
  )
SELECT
  5,
  'Johnny',
  'soporten2@dev.tec',
  'Soporte DOS',
  '$2a$10$eOvCA9QHT6J51A.IDO18K.Kh/9yFZB4woTjnSiRspmUlb2HECKmz2',
  '0968796010',
  6
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.usuarios
    WHERE
      correo = 'soporten2@dev.tec'
  );

-- Insert criticidad
UPDATE
  public.criticidad
SET
  criticidad_id = 1,
  descripcion = ' ',
  nombre = 'Inferior',
  valor = 0.10
WHERE
  criticidad_id = 1;

INSERT INTO
  public.criticidad(criticidad_id, descripcion, nombre, valor)
SELECT
  1,
  'Sistemas no críticos, como estaciones de trabajo de usuarios con funciones no críticas.',
  'Inferior',
  0.10
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.criticidad
    WHERE
      criticidad_id = 1
  );

UPDATE
  public.criticidad
SET
  criticidad_id = 2,
  descripcion = 'Sistemas que apoyan a una sola dependencia o proceso de una entidad.',
  nombre = 'Bajo',
  valor = 0.25
WHERE
  criticidad_id = 2;

INSERT INTO
  public.criticidad(criticidad_id, descripcion, nombre, valor)
SELECT
  2,
  'Sistemas que apoyan a una sola dependencia o proceso de una entidad.',
  'Bajo',
  0.25
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.criticidad
    WHERE
      criticidad_id = 2
  );

UPDATE
  public.criticidad
SET
  criticidad_id = 3,
  descripcion = 'Sistemas que apoyan más de una dependencias o proceso de la entidad.',
  nombre = 'Medio',
  valor = 0.50
WHERE
  criticidad_id = 3;

INSERT INTO
  public.criticidad(criticidad_id, descripcion, nombre, valor)
SELECT
  3,
  'Sistemas que apoyan más de una dependencias o proceso de la entidad.',
  'Medio',
  0.50
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.criticidad
    WHERE
      criticidad_id = 3
  );

UPDATE
  public.criticidad
SET
  criticidad_id = 4,
  descripcion = 'Sistemas pertenecientes al área de Tecnología y estaciones de trabajo de usuarios con funciones críticas.',
  nombre = 'Alto',
  valor = 0.75
WHERE
  criticidad_id = 4;

INSERT INTO
  public.criticidad(criticidad_id, descripcion, nombre, valor)
SELECT
  4,
  'Sistemas pertenecientes al área de Tecnología y estaciones de trabajo de usuarios con funciones críticas.',
  'Alto',
  0.75
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.criticidad
    WHERE
      criticidad_id = 4
  );

UPDATE
  public.criticidad
SET
  criticidad_id = 5,
  descripcion = 'Sistemas Críticos',
  nombre = 'Superior',
  valor = 1.00
WHERE
  criticidad_id = 5;

INSERT INTO
  public.criticidad(criticidad_id, descripcion, nombre, valor)
SELECT
  5,
  'Sistemas Críticos.',
  'Superior',
  1.00
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.criticidad
    WHERE
      criticidad_id = 5
  );