import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BASE_V1, loadHeader } from '../utils/constantes';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private BASE_URL = `${URL_BASE_V1}/rol/`

  constructor(private http: HttpClient) {}

  readAllRoles(): Observable<Rol> {
    return this.http.get<Rol>(`${this.BASE_URL}`, loadHeader());
  }

  readRolById(): Observable<Rol> {
    return this.http.get<Rol>(`${this.BASE_URL}`, loadHeader());
  }
}
