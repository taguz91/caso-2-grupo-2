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

  login(correo: string, password: string):Observable<Usuario> {
    return this.http.post<Usuario>(`${this.BASE_URL}`, {'correo':correo, 'password': password}, loadHeader())
    .pipe(
      tap((_) => console.log('Loading user data')),
      catchError(handleError<Usuario>(null))
    );
  }

  createUser(usuario: Usuario, rolId: bigint): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.BASE_URL}${rolId}`, usuario, loadHeader())
    .pipe(
      tap((_) => console.log('Loading user data')),
      catchError(handleError<Usuario>(null))
    );
  }

  readAllUsers(): Observable<PageResponse<Usuario[]>>   {
    return this.http.get<PageResponse<Usuario[]>>(`${this.BASE_URL}`, loadHeader())
    .pipe(
      tap((_) => console.log('Loading users data')),
      catchError(handleError<PageResponse<Usuario[]>>(null))
    );
  }

  readUserById(id: bigint): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}${id}`, loadHeader())
    .pipe(
      tap((_) => console.log('Loading user data')),
      catchError(handleError<Usuario>(null))
    );
  }

  updateUser(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}`, usuario, loadHeader())
    .pipe(
      tap((_) => console.log('Loading user data')),
      catchError(handleError<Usuario>(null))
    );
  }

  updateUserRol(personaId: bigint, rolId: bigint): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}${personaId}/${rolId}`, null, loadHeader())
    .pipe(
      tap((_) => console.log('Loading user data')),
      catchError(handleError<Usuario>(null))
    );
  }

  deleteUserById(id: bigint): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.BASE_URL}${id}`, loadHeader())
    .pipe(
      tap((_) => console.log('Loading user data')),
      catchError(handleError<Usuario>(null))
    );
  }
}
