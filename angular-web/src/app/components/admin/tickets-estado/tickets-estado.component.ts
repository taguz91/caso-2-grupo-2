import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-tickets-estado',
  templateUrl: './tickets-estado.component.html',
  styleUrls: ['./tickets-estado.component.scss']
})
export class TicketsEstadoComponent implements OnInit {

  constructor(private breadcrumb: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb.addRutes([
      {
        label: 'Tickets estado',
        toUrl: '/admin/tickets/1'
      }
    ]);
  }

}
