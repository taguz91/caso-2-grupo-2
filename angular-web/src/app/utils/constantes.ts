import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export const URL_BASE_V1: string =
  'http://ec2-54-227-48-41.compute-1.amazonaws.com:8080/api/v1/';

export const JWT_NAME = 'JWT_TIR_TEC_TOKEN';

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
    return of(result as T);
  };
}
