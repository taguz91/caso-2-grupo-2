import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/types';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-admin-alert',
  templateUrl: './admin-alert.component.html',
  styleUrls: ['./admin-alert.component.scss'],
})
export class AdminAlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe((res) => (this.alerts = res));
  }

  remove(position: number) {
    this.alertService.remove(position);
  }
}
