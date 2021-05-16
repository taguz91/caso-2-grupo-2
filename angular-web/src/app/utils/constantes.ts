import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PageMetadata } from '../models/Parametros';

export const URL_BASE_V1: string =
  'http://ec2-54-227-48-41.compute-1.amazonaws.com:8080/api/v1/';

export const JWT_NAME: string = 'JWT_TIR_TEC_TOKEN';

export const DEFAULT_PAGE_SIZE: number = 20;

export const DEFAULT_PAGE_METADA: PageMetadata = {
  current: 0,
  items: 0,
  pages: 0,
};

export function loadHeader() {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (localStorage.getItem(JWT_NAME) ?? ''),
    }),
  };
}

export function handleError<T>(result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    if (error.error) {
      return of(error.error as T);
    }
    return of(result as T);
  };
}
