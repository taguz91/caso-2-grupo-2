import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../models/usuario';
import { JWT_NAME, URL_BASE_V1 } from '../utils/constantes';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private user: LoginUser;

  constructor(private router: Router, private http: HttpClient) {}

  saveToken(user: LoginUser) {
    localStorage.setItem(JWT_NAME, user.token);
    this.user = user;
    this.router.navigate(['/user/home']);
  }

  isLoged(): boolean {
    return localStorage.getItem(JWT_NAME) !== null;
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
    this.user = null;
    this.router.navigate(['/']);
  }

  async userLoged(): Promise<LoginUser> {
    if (this.user) return this.user;
    this.user = await this.http
      .get<LoginUser>(`${URL_BASE_V1}user/loged`)
      .toPromise();

    return this.user;
  }
}
