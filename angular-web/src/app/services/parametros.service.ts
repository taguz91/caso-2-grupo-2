import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  DEFAULT_PAGE_SIZE,
  handleError,
  loadHeader,
  URL_BASE_V1,
} from '../utils/constantes';

import {
  CatalogoServicio,
  PageResponse,
  Parametro,
} from './../models/Parametros';

@Injectable({
  providedIn: 'root',
})
export class ParametrosService {
  constructor(private http: HttpClient) {}

  listTipoServicios(): Observable<Parametro[]> {
    return this.callService('parametros/tipo-servicios');
  }

  listImpactos(): Observable<Parametro[]> {
    return this.callService('parametros/impacto');
  }

  listNivelPrioridad(): Observable<Parametro[]> {
    return this.callService('parametros/nivel-prioridad');
  }

  listEstados(): Observable<Parametro[]> {
    return this.callService('parametros/estados');
  }

  listMediosComunicacion(): Observable<Parametro[]> {
    return this.callService('parametros/medios-comunicacion');
  }

  private callService(url: string): Observable<Parametro[]> {
    return this.http
      .get<Parametro[]>(`${URL_BASE_V1 + url}`, loadHeader())
      .pipe(
        tap((_) => console.log('Loading tipos de servicio')),
        catchError(handleError<Parametro[]>([]))
      );
  }

  listCatalogoServicios(
    tipoServicio: number,
    page: number,
    size: number = DEFAULT_PAGE_SIZE
  ): Observable<PageResponse<CatalogoServicio[]>> {
    return this.http
      .get<PageResponse<CatalogoServicio[]>>(
        `${URL_BASE_V1}catalogo/tipo/${tipoServicio}?page=${page}&size=${size}`,
        loadHeader()
      )
      .pipe(
        tap((_) => console.log('Loading catalogo servicios')),
        catchError(handleError<PageResponse<CatalogoServicio[]>>(null))
      );
  }
}
