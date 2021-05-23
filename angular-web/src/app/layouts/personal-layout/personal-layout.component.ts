import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/usuario';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-personal-layout',
  templateUrl: './personal-layout.component.html',
  styleUrls: ['./personal-layout.component.scss'],
})
export class PersonalLayoutComponent implements OnInit {
  user: LoginUser;
  homeUrl: string = '/dashboard/coordinador';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  logout() {
    this.sessionService.logout();
  }

  private loadUser() {
    const user = this.sessionService.user;
    this.sessionService.getUser().subscribe((_) => this.loadUser());
    if (user) {
      this.user = user;
      if (this.sessionService.isSoporte()) {
        this.homeUrl = '/dashboard/soporte';
      }
    }
  }
}
