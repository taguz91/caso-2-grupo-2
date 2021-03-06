package com.tecazuay.example.restapi;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public abstract class Types {

	// Tipos de parametros
	public final static int PARAMETROS_IMPACTO = 1;
	public final static int PARAMETROS_NIVEL_PRIORIDAD = 2;
	public final static int PARAMETROS_ESTADOS = 3;
	public final static int PARAMETROS_TIPO_SERVICIOS = 4;
	public final static int PARAMETROS_MEDIOS_COMUNICACION = 5;

	// Estados de un ticket
	public final static long PARAMETROS_ESTADO_ABIERTO = 9;
	public final static long PARAMETROS_ESTADO_ATENDIENDOSE = 10;
	public final static long PARAMETROS_ESTADO_RECHAZADO = 11;
	public final static long PARAMETROS_ESTADO_CERRADO_SIN_SOLUCION = 13;
	public final static long PARAMETROS_ESTADO_CERRADO_CON_SOLUCION = 14;

	// Tipos de roles
	public final static int ROL_DEVELOPER = 1;
	public final static int ROL_ADMIN = 2;
	public final static int ROL_USUARIO = 3;
	public final static int ROL_COORDINADOR = 4;
	public final static int ROL_SOPORTE_N1 = 5;
	public final static int ROL_SOPORTE_N2 = 6;

	// Tipos de medios de contacto
	public final static int MEDIO_COMUNICACION_CORREO = 17;
	public final static int MEDIO_COMUNICACION_CELULAR = 18;
	public final static int MEDIO_COMUNICACION_TELEFONO = 19;

	// Date format
	public static DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ISO_DATE_TIME;

	public static String getNowDate() {
		LocalDateTime date = LocalDateTime.now();
		return date.format(DATE_FORMAT);
	}

}
