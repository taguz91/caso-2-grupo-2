import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/types';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.scss'],
})
export class UserAlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe((res) => (this.alerts = res));
  }

  remove(position: number) {
    this.alertService.remove(position);
  }
}
