import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root',
})
export class FilterUsuarioService implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validate();
  }

  private validate(): boolean {
    if (this.sessionService.isFinalUser()) {
      return true;
    } else {
      this.router.navigate(['/load']);
      return false;
    }
  }
}
