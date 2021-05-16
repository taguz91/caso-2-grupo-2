import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Criticidad } from '../models/criticidad';
import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';
@Injectable({
  providedIn: 'root'
})
export class CriticidadService {

  constructor(private http: HttpClient) {  }

  getAllCriticidad(): Observable<Criticidad[]> {
    return this.http.get<Criticidad[]>(`${URL_BASE_V1}criticidad/`, loadHeader()).pipe(
      tap((_) => console.log('Cargando criticidad')),
      catchError(handleError<Criticidad[]>([]))
    );
  }
}
