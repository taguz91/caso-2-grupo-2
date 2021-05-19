import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/parametros';
import { catchError, tap } from 'rxjs/operators';
import { Medio, Ticket } from '../models/medio';
import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';
@Injectable({
  providedIn: 'root'
})
export class MedioService {

  constructor(private http: HttpClient) {  }

  createUser(medio: Medio, ticket_id: number): Observable<Medio> {
    return this.http.post<Medio>(`${URL_BASE_V1}medio-comunicacion/${ticket_id}`, medio, loadHeader())
    .pipe(
      tap((_) => console.log('Loading')),
      catchError(handleError<Medio>(null))
    );
  }

  getMedioById(medio_id:number): Observable<Medio> {
    return this.http.get<Medio>(`${URL_BASE_V1}medio-comunicacion/${medio_id}`, loadHeader()).pipe(
      tap((_) => console.log('Loading')),
      catchError(handleError<Medio>(null))
    );
  }

  deleteUserById(medio_id: number): Observable<Medio> {
    return this.http.delete<Medio>(`${URL_BASE_V1}${medio_id}`, loadHeader())
    .pipe(
      tap((_) => console.log('Loading user data')),
      catchError(handleError<Medio>(null))
    );
  }
  
  }

