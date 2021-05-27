import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PageMetadata } from '../models/Parametros';
import { AlertService } from '../services/alert.service';

export const URL_BASE_V1: string =
  'http://ec2-54-227-48-41.compute-1.amazonaws.com:8080/api/v1/';

export const JWT_NAME: string = 'JWT_TIR_TEC_TOKEN';

export const DEFAULT_PAGE_SIZE: number = 10;
export const MEDIO_COMUNICACION_DEFAULT: number[] = [17];

export const DEFAULT_PAGE_METADA: PageMetadata = {
  current: 0,
  items: 0,
  pages: 0,
  perPage: DEFAULT_PAGE_SIZE,
};

// Constantes de roles de usuario
export const ROL_DEVELOPER: number = 1;
export const ROL_ADMIN: number = 2;
export const ROL_USUARIO: number = 3;
export const ROL_COORDINADOR: number = 4;
export const ROL_SOPORTE_N1: number = 5;
export const ROL_SOPORTE_N2: number = 6;

// Constantes de estados de un ticket
export const TICKET_ESTADO_ABIERTO: number = 9;
export const TICKET_ESTADO_ATENDIENDOSE: number = 10;
export const TICKET_ESTADO_RECHAZADO: number = 11;
export const TICKET_ESTADO_CERRADO_SIN_SOLUCION: number = 13;
export const TICKET_ESTADO_CERRADO_CON_SOLUCION: number = 14;

export function loadHeader() {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (localStorage.getItem(JWT_NAME) ?? ''),
    }),
  };
}

export function handleError<T>(result?: T, alertService?: AlertService) {
  return (error: any): Observable<T> => {
    console.error(error);
    if (error.error) {
      if (alertService && error.error.message) {
        alertService.error(error.error.message);
      }
      return of(error.error as T);
    }
    return of(result as T);
  };
}
