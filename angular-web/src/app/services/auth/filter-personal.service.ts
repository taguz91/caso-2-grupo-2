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
export class FilterPersonalService implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.sessionService.user;
    if (user) {
      return this.validate();
    }
    this.sessionService.getUser().subscribe(() => {
      this.validate();
    });
    return true;
  }

  private validate(): boolean {
    if (this.sessionService.isPersonal()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
