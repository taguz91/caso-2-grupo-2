/// This class contains all global configurations for the aplication

/// Global V1 API
const String URL_BASE_V1 =
    'http://ec2-54-227-48-41.compute-1.amazonaws.com:8080/api/v1';

/// Global constant name
const TOKEN_NAME = 'tir_tec_token';

/// Default page size
const DEFAULT_PAGE_SIZE = 10;

/// Estados de un tickcet
const TICKET_ESTADO_ABIERTO = 9;
const TICKET_ESTADO_ATENDIENDOSE = 10;
const TICKET_ESTADO_RECHAZADO = 11;
const TICKET_ESTADO_CERRADO_SIN_SOLUCION = 13;
const TICKET_ESTADO_CERRADO_CON_SOLUCION = 14;

/// Roles del sistema
const ROL_DEVELOPER = 1;
const ROL_ADMIN = 2;
const ROL_USUARIO = 3;
const ROL_COORDINADOR = 4;
const ROL_SOPORTE_N1 = 5;
const ROL_SOPORTE_N2 = 6;
