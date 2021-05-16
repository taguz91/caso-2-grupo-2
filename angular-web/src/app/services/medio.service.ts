import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Medio } from '../models/medio';
import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';
@Injectable({
  providedIn: 'root'
})
export class MedioService {

  constructor(private http: HttpClient) {  }

  getAllMedio(): Observable<Medio[]> {
    return this.http.get<Medio[]>(`${URL_BASE_V1}medioComunicacion/`, loadHeader()).pipe(
      tap((_) => console.log('Cargando medio de comunicacion')),
      catchError(handleError<Medio[]>([]))
    );
  }
}