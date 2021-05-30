import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Encuesta, EncuestaView } from '../models/encuesta';
import { handleError, loadHeader, URL_BASE_V1, DEFAULT_PAGE_SIZE } from '../utils/constantes';
import { PageResponse } from '../models/parametros';

@Injectable({
  providedIn: 'root'
})
export class EncuesatisService {

  constructor(private http: HttpClient) {}

  registerEncuesta(Encuesta:any){
    return this.http
    .post<any>(`${URL_BASE_V1}encuesta/`,Encuesta,loadHeader());
  }

  listEncuestas(page: number,
    size: number = DEFAULT_PAGE_SIZE):  Observable<PageResponse<EncuestaView[]>> {
    return this.http.get<PageResponse<EncuestaView[]>>(`${URL_BASE_V1}encuesta/?page=${page}&size=${size}`,
        loadHeader()
      )
      .pipe(
        tap((_) => console.log('Loading encuestas')),
        catchError(handleError(null))
      );
  }


}
