import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageError } from '../models/errors';

import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';

import { Parametro } from './../models/Parametros';

@Injectable({
  providedIn: 'root',
})
export class ParametrosService {
  constructor(private http: HttpClient) {}

  listTipoServicios(): Observable<Parametro[]> {
    return this.http
      .get<Parametro[]>(`${URL_BASE_V1}parametros/tipo-servicios`, loadHeader())
      .pipe(
        tap((_) => console.log('Loading tipos de servicio')),
        catchError(handleError<Parametro[]>([]))
      );
  }
}
