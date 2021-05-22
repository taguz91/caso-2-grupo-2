import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginUser } from 'src/app/models/usuario';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.scss'],
})
export class UserPerfilComponent implements OnInit {
  private userData = new Subject<LoginUser>();
  user: LoginUser;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private async loadUser() {
    const user = await this.sessionService.userLoged();
    this.userData.next(user);
    return this.userData.asObservable().subscribe((user) => (this.user = user));
  }
}
