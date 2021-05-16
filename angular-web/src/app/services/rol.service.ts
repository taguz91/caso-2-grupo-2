import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BASE_V1, loadHeader, handleError } from '../utils/constantes';
import { Rol } from '../models/rol';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private BASE_URL = `${URL_BASE_V1}/rol/`

  constructor(private http: HttpClient) {}

  readAllRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.BASE_URL}`, loadHeader())
    .pipe(
      tap((_) => console.log('Loading rol servicios')),
      catchError(handleError<Rol[]>([]))
    );
  }

  readRolById(id: string): Observable<Rol> {
    return this.http.get<Rol>(`${this.BASE_URL}${id}`, loadHeader())
    .pipe(
      tap((_) => console.log('Loading rol servicios')),
      catchError(handleError<Rol>(null))
    );
  }
}
