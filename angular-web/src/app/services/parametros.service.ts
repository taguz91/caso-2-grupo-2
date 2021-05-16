import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DEFAULT_PAGE_SIZE, handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';

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
    return this.http
      .get<Parametro[]>(`${URL_BASE_V1}parametros/tipo-servicios`, loadHeader())
      .pipe(
        tap((_) => console.log('Loading tipos de servicio')),
        catchError(handleError<Parametro[]>([]))
      );
  }

  listCatalogoServicios(
    tipoServicio: number,
    page: number
  ): Observable<PageResponse<CatalogoServicio[]>> {
    return this.http
      .get<PageResponse<CatalogoServicio[]>>(
        `${URL_BASE_V1}catalogo/tipo/${tipoServicio}?page=${page}&size=${DEFAULT_PAGE_SIZE}`,
        loadHeader()
      )
      .pipe(
        tap((_) => console.log('Loading catalogo servicios')),
        catchError(handleError<PageResponse<CatalogoServicio[]>>(null))
      );
  }
}
