import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-overley',
  templateUrl: './overley.component.html',
  styleUrls: ['./overley.component.scss'],
})
export class OverleyComponent implements OnInit {
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    setTimeout(() => {
      const user = this.sessionService.user;
      if (user) {
        this.sessionService.redirect();
      } else {
        this.sessionService.getUser().subscribe((_) => {
          this.sessionService.redirect();
        });
      }
    }, 2500);
  }
}
