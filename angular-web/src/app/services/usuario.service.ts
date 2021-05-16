import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';
import { PageResponse } from '../models/parametros';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private BASE_URL = `${URL_BASE_V1}/usuario/`

  constructor(private http: HttpClient) {}

  login(correo: string, password: string):Observable<any> {
    return this.http.post<PageResponse<Usuario[]>>(`${this.BASE_URL}`, {'correo':correo, 'password': password}, loadHeader())
    .pipe(
      tap((_) => console.log('Loading usuario servicios')),
      catchError(handleError<any>(null))
    );
  }

  createUser(usuario: Usuario, rolId: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.BASE_URL}${rolId}`, usuario, loadHeader())
    .pipe(
      tap((_) => console.log('Loading usuario servicios')),
      catchError(handleError<Usuario>(null))
    );
  }

  readAllUsers(): Observable<PageResponse<Usuario[]>>   {
    return this.http.get<PageResponse<Usuario[]>>(`${this.BASE_URL}`, loadHeader())
    .pipe(
      tap((_) => console.log('Loading usuario servicios')),
      catchError(handleError<PageResponse<Usuario[]>>(null))
    );
  }

  readUserById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}${id}`, loadHeader())
    .pipe(
      tap((_) => console.log('Loading usuario servicios')),
      catchError(handleError<Usuario>(null))
    );
  }

  updateUser(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}`, usuario, loadHeader())
    .pipe(
      tap((_) => console.log('Loading usuario servicios')),
      catchError(handleError<Usuario>(null))
    );
  }

  updateUserRol(personaId: string, rolId: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}${personaId}/${rolId}`, null, loadHeader())
    .pipe(
      tap((_) => console.log('Loading usuario servicios')),
      catchError(handleError<Usuario>(null))
    );
  }
}
