import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tirtec';
  constructor(private router: Router, private sessionService: SessionService) {}
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.logedUserData();
  }

  private logedUserData() {
    if (this.sessionService.isLoged()) {
      this.sessionService.getUserData().subscribe((user) => {
        console.log('USER DATA IS:', user);
      });
    }
  }
}
