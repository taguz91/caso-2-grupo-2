CREATE TABLE rol (
  rol_id SERIAL NOT NULL,
  nombre character varying(20) NOT NULL,
  create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  created_by integer NOT NULL,
  updated_by integer NOT NULL,
  is_deleted boolean DEFAULT FALSE,
  CONSTRAINT rol_pkey PRIMARY KEY (rol_id)
);

CREATE TABLE persona (
  persona_id SERIAL NOT NULL,
  nombres character varying(20) NOT NULL,
  cedula character varying(10),
  correo character varying(100),
  password character varying(50) NOT NULL,
  token character varying,
  telefono character varying(20) COLLATE pg_catalog."default",
  create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  created_by integer NOT NULL,
  updated_by integer NOT NULL,
  is_deleted boolean DEFAULT FALSE,
  rol_id integer NOT NULL,
  CONSTRAINT persona_pkey PRIMARY KEY (persona_id),
  CONSTRAINT fk_rol FOREIGN KEY (rol_id) REFERENCES public.rol (rol_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID
);

-- Parameter table 
CREATE TABLE parametros (
  parametros_id SERIAL NOT NULL,
  type SMALLINT NOT NULL,
  nombre CHARACTER VARYING(255) NOT NULL,
  descripcion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_by BIGINT,
  is_deleted BOOLEAN DEFAULT false,
  CONSTRAINT parametro_pk PRIMARY KEY ("parametros_id")
) WITH (OIDS = FALSE);

-- Ticket table 
CREATE TABLE ticket (
  ticket_id SERIAL NOT NULL,
  titulo CHARACTER VARYING(255) NOT NULL,
  descripcion TEXT NOT NULL,
  persona_id BIGINT NOT NULL,
  estado_id BIGINT NOT NULL,
  catalogo_id BIGINT NOT NULL,
  impacto_id BIGINT NOT NULL,
  responsable_id BIGINT NOT NULL,
  responsable_solucion_id BIGINT NOT NULL,
  fecha_solucion TIMESTAMP,
  solucion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_by BIGINT,
  is_deleted BOOLEAN DEFAULT false,
  CONSTRAINT ticket_pk PRIMARY KEY ("ticket_id")
) WITH (OIDS = FALSE);

CREATE TABLE criticidad (
  criticidad_id SERIAL NOT NULL,
  nombre CHARACTER VARYING(255) NOT NULL,
  valor NUMERIC(2, 2) NOT NULL,
  descripcion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_by BIGINT,
  is_deleted BOOLEAN DEFAULT false,
  CONSTRAINT criticidad_pk PRIMARY KEY ("criticidad_id")
) WITH (OIDS = FALSE);

CREATE TABLE categoria (
  categoria_id INTEGER NOT NULL,
  nombre_categoria VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_by BIGINT,
  is_deleted BOOLEAN DEFAULT false,
  CONSTRAINT pk_categoria_id PRIMARY KEY (categoria_id)
) WITH (OIDS = FALSE);

CREATE TABLE servicio (
  servicio_id INTEGER NOT NULL,
  nombre_servicio VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_by BIGINT,
  is_deleted BOOLEAN DEFAULT false,
  categoria_id INTEGER NOT NULL,
  CONSTRAINT pk_servicio_id PRIMARY KEY (servicio_id),
  CONSTRAINT fk_categoria_id FOREIGN KEY (categoria_id) REFERENCES Categoria(categoria_id)
) WITH (OIDS = FALSE);

create table catalogo(
  catalogo_id SERIAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_by BIGINT,
  is_deleted BOOLEAN DEFAULT false,
  descripcion varchar(100) not null,
  tipo_servicio_id BIGINT NOT NULL,
  servicio_id BIGINT NOT NULL,
  primary key(catalogo_id),
  CONSTRAINT catalogo_tiposervicio FOREIGN KEY(tipo_servicio_id) REFERENCES parametros(parametros_id),
  CONSTRAINT historial_servicio FOREIGN KEY(servicio_id) REFERENCES servicio(servicio_id)
) WITH (OIDS = FALSE);

create table historial(
  historial_id SERIAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_by BIGINT,
  is_deleted BOOLEAN DEFAULT false,
  accion varchar(100) not null,
  ticket_id BIGINT NOT NULL,
  primary key(historial_id),
  CONSTRAINT historial_ticket FOREIGN KEY(ticket_id) REFERENCES ticket(ticket_id)
) WITH (OIDS = FALSE);

create table medio_comunicacion(
  medio_id integer,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_by BIGINT,
  is_deleted BOOLEAN DEFAULT false,
  descripcion varchar(100) not null,
  ticket_id BIGINT NOT NULL,
  primary key(medio_id),
  CONSTRAINT FKtest FOREIGN KEY(ticket_id) REFERENCES ticket(ticket_id)
) WITH (OIDS = FALSE);

CREATE TABLE encuesta_satisfaccion(
  encuesta_satisfaccion_id INTEGER NOT NULL,
  calificacion INTEGER NOT NULL,
  comentario VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT false,
  ticket_id INTEGER NOT NULL,
  CONSTRAINT pk_encuesta_satisfaccion_id PRIMARY KEY (encuesta_satisfaccion_id),
  CONSTRAINT fk_ticket_id FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id)
) WITH (OIDS = FALSE);

CREATE TABLE public.adjuntos (
  id_adjuntos integer NOT NULL,
  url "char",
  created_at time with time zone NOT NULL,
  update_at time with time zone NOT NULL,
  created_by bigint,
  update_by bigint,
  is_deleted boolean,
  ticket_id BIGINT NOT NULL,
  CONSTRAINT fk_ticket_adjunto FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id)
);

CREATE TABLE public.sla (
  id_sla integer NOT NULL,
  tiempo_resolucion time with time zone,
  tiempo_respuesta time with time zone,
  reglas_escala "char",
  criticidad_id bigint NOT NULL,
  impacto_id bigint NOT NULL,
  nivel_prioridad_id bigint NOT NULL,
  created_at time with time zone NOT NULL,
  update_at time with time zone NOT NULL,
  created_by bigint,
  update_by bigint,
  is_deleted bigint,
  catalogo_id bigint NOT NULL,
  CONSTRAINT fk_sla_catalogo FOREIGN KEY (catalogo_id) REFERENCES catalogo(catalogo_id),
  CONSTRAINT fk_criticidad_sla FOREIGN KEY (criticidad_id) REFERENCES criticidad(criticidad_id)
);

-- Alters for the relations 
ALTER TABLE
  ticket
ADD
  CONSTRAINT "persona_fk_ticket" FOREIGN KEY ("persona_id") REFERENCES persona(persona_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
  ticket
ADD
  CONSTRAINT "estado_fk_ticket" FOREIGN KEY ("estado_id") REFERENCES parametros(parametros_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
  ticket
ADD
  CONSTRAINT "impacto_fk_ticket" FOREIGN KEY ("impacto_id") REFERENCES parametros(parametros_id) ON UPDATE CASCADE ON DELETE CASCADE;