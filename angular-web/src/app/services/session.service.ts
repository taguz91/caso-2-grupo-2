import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginUser } from '../models/usuario';
import {
  JWT_NAME,
  loadHeader,
  ROL_ADMIN,
  ROL_COORDINADOR,
  ROL_DEVELOPER,
  ROL_SOPORTE_N1,
  ROL_SOPORTE_N2,
  ROL_USUARIO,
  URL_BASE_V1,
} from '../utils/constantes';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  user: LoginUser;
  private userData = new Subject<LoginUser>();

  constructor(private router: Router, private http: HttpClient) {}

  saveToken(user: LoginUser) {
    localStorage.setItem(JWT_NAME, user.token);
    this.user = user;
    this.redirect();
  }

  redirect() {
    let route = '/user/home';
    switch (this.user.type) {
      case ROL_SOPORTE_N1:
      case ROL_SOPORTE_N2:
        route = '/dashboard/soporte';
        break;

      case ROL_COORDINADOR:
        route = '/dashboard/coordinador';
        break;
    }
    this.router.navigate([route]);
  }

  isLoged(): boolean {
    return localStorage.getItem(JWT_NAME) !== null;
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
    this.user = null;
    this.router.navigate(['/']);
  }

  getUserData(): Observable<LoginUser> {
    return this.http
      .get<LoginUser>(`${URL_BASE_V1}usuario/loged`, loadHeader())
      .pipe(
        tap((user) => {
          this.user = user;
          this.userData.next(user);
        })
      );
  }

  getUser(): Observable<LoginUser> {
    return this.userData.asObservable();
  }

  isAdmin(): boolean {
    return this.isRol(ROL_ADMIN);
  }

  isUser(): boolean {
    return this.isRol(ROL_USUARIO);
  }

  isCoordinador(): boolean {
    return this.isRol(ROL_COORDINADOR);
  }

  isSoporte(): boolean {
    return this.isRol(ROL_SOPORTE_N1) || this.isRol(ROL_SOPORTE_N2);
  }

  isDev(): boolean {
    return this.isRol(ROL_DEVELOPER);
  }

  private isRol(rol: number): boolean {
    return this.user.type === rol;
  }
}
