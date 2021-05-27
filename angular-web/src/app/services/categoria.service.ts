import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Categoria } from '../models/categoria';
import { PageResponse } from '../models/Parametros';

import { DEFAULT_PAGE_SIZE, handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  // listCategorias(): Observable<Categoria[]>{
  //   return this.http.get<Categoria[]>(`${URL_BASE_V1}categorias/`, loadHeader())
  //   .pipe(
  //     tap((_) => console.log('Loading categorias...')),
  //     catchError(handleError<Categoria[]>([]))
  //   );
  // }

  listCategorias(
    page?: number,
    size: number = DEFAULT_PAGE_SIZE
  ): Observable<PageResponse<Categoria[]>> {
    return this.http
      .get<PageResponse<Categoria[]>>(
        `${URL_BASE_V1}categorias/?page=${page}&size=${size}`,
        loadHeader()
      )
      .pipe(
        tap((_) => console.log('Loading categorias...')),
        catchError(handleError<PageResponse<Categoria[]>>(null))
      );
  }

  findByNombreCategoria(nombre_categoria: String): Observable<any> {
    return this.http.get<any>(
      `${URL_BASE_V1}categorias/nombre-categoria?nombre_categoria=${nombre_categoria}`,
      loadHeader()
    );
  }

  listCategoriasToServicio(): Observable<PageResponse<Categoria[]>> {
    return this.http
      .get<PageResponse<Categoria[]>>(`${URL_BASE_V1}categorias/`, loadHeader())
      .pipe(
        tap((_) => console.log('Loading categorias...')),
        catchError(handleError<PageResponse<Categoria[]>>(null))
      );
  }

  addCategoria(categoria: Categoria): Observable<any> {
    const body = JSON.stringify(categoria);
    console.log(body);
    return this.http.post<any>(`${URL_BASE_V1}categorias/`, body, loadHeader());
  }

  updateCategoria(id: any, categoria: Categoria): Observable<any> {
    const body = JSON.stringify(categoria);
    console.log(body);
    return this.http.put<any>(
      `${URL_BASE_V1}categorias/${id}`,
      body,
      loadHeader()
    );
  }

  deleteCategoria(id: any): Observable<any> {
    return this.http.delete<any>(
      `${URL_BASE_V1}categorias/${id}`,
      loadHeader()
    );
  }
}
