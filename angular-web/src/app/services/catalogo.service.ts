import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CatalogoForm, CatalogoView } from '../models/catalogo';
import { PageResponse } from '../models/Parametros';
import {
  DEFAULT_PAGE_SIZE,
  handleError,
  loadHeader,
  URL_BASE_V1,
} from '../utils/constantes';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  save(form: CatalogoForm): Observable<CatalogoView> {
    return this.http
      .post<CatalogoView>(`${URL_BASE_V1}catalogo/catalogo`, form, loadHeader())
      .pipe(catchError(handleError<CatalogoView>(null, this.alertService)));
  }

  update(idCatalogo: number, form: CatalogoForm): Observable<CatalogoView> {
    return this.http
      .put<CatalogoView>(
        `${URL_BASE_V1}catalogo/catalogo/${idCatalogo}`,
        form,
        loadHeader()
      )
      .pipe(catchError(handleError<CatalogoView>(null, this.alertService)));
  }

  delete(idCatalogo: number): Observable<number> {
    return this.http
      .delete<number>(
        `${URL_BASE_V1}catalogo/catalogo/${idCatalogo}`,
        loadHeader()
      )
      .pipe(catchError(handleError<number>(null, this.alertService)));
  }

  one(idCatalogo: number): Observable<CatalogoView> {
    return this.http.get<CatalogoView>(
      `${URL_BASE_V1}catalogo/catalogo/${idCatalogo}`,
      loadHeader()
    );
  }

  all(
    page: number,
    size: number = DEFAULT_PAGE_SIZE
  ): Observable<PageResponse<CatalogoView[]>> {
    return this.http.get<PageResponse<CatalogoView[]>>(
        `${URL_BASE_V1}catalogo/?page=${page}&size=${size}`,
        loadHeader()
      )
      .pipe(catchError(handleError<PageResponse<CatalogoView[]>>(null)));
  }
}
