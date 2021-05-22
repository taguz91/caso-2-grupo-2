import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/usuario';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.scss'],
})
export class UserPerfilComponent implements OnInit {
  user: LoginUser;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser() {
    this.user = this.sessionService.getUser();
    if (!this.user) {
      this.sessionService.getUserData().subscribe((user) => (this.user = user));
    }
  }
}
