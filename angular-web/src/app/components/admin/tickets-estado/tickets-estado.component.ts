import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-tickets-estado',
  templateUrl: './tickets-estado.component.html',
  styleUrls: ['./tickets-estado.component.scss'],
})
export class TicketsEstadoComponent implements OnInit {
  constructor(
    private breadcrumb: BreadcrumbService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.breadcrumb.addRutes([
      {
        label: 'Tickets estado',
        toUrl: '/admin/tickets/1',
      },
    ]);
    this.alertService.success('Nuevo mensaje');
    this.alertService.warning('Es un warning');
    this.alertService.info('Info de dos dos ');
  }
}
