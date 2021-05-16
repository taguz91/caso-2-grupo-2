import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../models/usuario';
import { JWT_NAME } from '../utils/constantes';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  user: LoginUser;

  constructor(private router: Router) {}

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
}
