import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { loadHeader, URL_BASE_V1 } from '../utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private BASE_URL = `${URL_BASE_V1}/usuario/`

  constructor(private http: HttpClient) {}

  login(correo: string, password: string):Observable<Usuario> {
    return this.http.post<Usuario>(`${this.BASE_URL}`, {'correo':correo, 'password': password}, loadHeader());
  }

  createUser(usuario: Usuario, rolId: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.BASE_URL}${rolId}`, usuario, loadHeader());
  }

  readAllUsers(): Observable<Usuario>   {
    return this.http.get<Usuario>(`${this.BASE_URL}`, loadHeader());
  }

  readUserById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}${id}`, loadHeader());
  }

  updateUser(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}`, usuario, loadHeader());
  }

  updateUserRol(personaId: string, rolId: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}${personaId}/${rolId}`, null, loadHeader())
  }
}
