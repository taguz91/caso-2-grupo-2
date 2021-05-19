import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alerts = new Subject<Alert[]>();
  private list: Alert[] = [];

  constructor() {}

  remove(position: number) {
    this.list.splice(position, 1);
    this.alerts.next(this.list);
  }

  success(message: string) {
    this.list.push({
      message: message,
      type: 'alert-success',
    });

    this.addListeners();
  }

  error(message: string) {
    this.list.push({
      message: message,
      type: 'alert-danger',
    });

    this.addListeners();
  }

  info(message: string) {
    this.list.push({
      message: message,
      type: 'alert-info',
    });

    this.addListeners();
  }

  warning(message: string) {
    this.list.push({
      message: message,
      type: 'alert-warning',
    });
  }

  private addListeners() {
    if (this.list.length > 4) {
      this.list.splice(0, 3);
    }
    this.alerts.next(this.list);
  }

  getAlerts(): Observable<Alert[]> {
    return this.alerts.asObservable();
  }
}
