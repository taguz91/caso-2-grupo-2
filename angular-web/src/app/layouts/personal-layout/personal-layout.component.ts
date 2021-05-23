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

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  logout() {
    this.sessionService.logout();
  }

  private loadUser() {
    this.sessionService.getUser().subscribe((user) => (this.user = user));
  }
}
