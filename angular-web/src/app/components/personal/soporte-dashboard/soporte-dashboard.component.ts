import { Component, OnInit } from '@angular/core';
import { PageMetadata } from 'src/app/models/Parametros';
import { TicketHome } from 'src/app/models/ticket';
import { SessionService } from 'src/app/services/session.service';
import { TicketService } from 'src/app/services/ticket.service';
import { DEFAULT_PAGE_METADA } from 'src/app/utils/constantes';

@Component({
  selector: 'app-soporte-dashboard',
  templateUrl: './soporte-dashboard.component.html',
  styleUrls: ['./soporte-dashboard.component.scss'],
})
export class SoporteDashboardComponent implements OnInit {
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;
  tickets: TicketHome[] = [];
  loading: boolean = true;
  isLastPage: boolean = false;
  private page: number = 0;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  private loadTickets() {
    this.ticketService.listBySoporte(this.page).subscribe((res) => {
      this.tickets.push(...res.data);
      this.isLastPage = res.meta.pages === this.page + 1;
      this.loading = false;
    });
  }

  loadMore() {
    this.loading = true;
    this.page++;
    this.loadTickets();
  }
}
