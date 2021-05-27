import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/usuario';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  user: LoginUser;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    const user = this.sessionService.user;
    if (user) {
      this.user = user;
    } else {
      this.sessionService.getUser().subscribe((user) => (this.user = user));
    }
  }

  logout() {
    this.sessionService.logout();
  }
}
