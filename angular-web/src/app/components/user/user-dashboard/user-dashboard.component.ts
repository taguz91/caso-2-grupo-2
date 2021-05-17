import { Component, OnInit } from '@angular/core';
import { PageMetadata } from 'src/app/models/Parametros';
import { TicketHome } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { DEFAULT_PAGE_METADA } from 'src/app/utils/constantes';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
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
    this.ticketService.listUser(this.page, 5).subscribe((res) => {
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
