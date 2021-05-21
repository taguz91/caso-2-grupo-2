import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Categoria, PageResponse } from '../models/categoria';

import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) {}

  // listCategorias(): Observable<Categoria[]>{
  //   return this.http.get<Categoria[]>(`${URL_BASE_V1}categorias/`, loadHeader())
  //   .pipe(
  //     tap((_) => console.log('Loading categorias...')),
  //     catchError(handleError<Categoria[]>([]))
  //   );
  // }

  listCategorias():Observable<PageResponse<Categoria[]>>{
    return this.http.get<PageResponse<Categoria[]>>(
      `${URL_BASE_V1}categorias/`, loadHeader()
    )
    .pipe(
      tap((_) => console.log('Loading categorias...')),
      catchError(handleError<PageResponse<Categoria[]>>(null))
    );
  }

   addCategoria(categoria: Categoria):Observable<any>{
     const body = JSON.stringify(categoria);
     console.log(body);
      return this.http.post<any>(`${URL_BASE_V1}categorias/`, body, loadHeader());
  }

  updateCategoria(id: any, categoria: Categoria):Observable<any>{
    const body = JSON.stringify(categoria);
    console.log(body);
    return this.http.put<any>(`${URL_BASE_V1}categorias/${id}`, body, loadHeader());
  }

  deleteCategoria(id: any):Observable<any>{
    return this.http.delete<any>(`${URL_BASE_V1}categorias/${id}`, loadHeader());
  }

}
