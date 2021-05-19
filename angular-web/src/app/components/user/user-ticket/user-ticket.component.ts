import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketView } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserTicketComponent implements OnInit {
  private ticketId: number = 0;
  ticket: TicketView;
  urlEdit: string = '';
  isOpen: boolean = true;

  constructor(
    private ticketService: TicketService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('idTicket');
    if (id) {
      this.ticketId = parseInt(id);
      this.findOne();
    }
  }

  findOne() {
    this.ticketService.one(this.ticketId).subscribe((res) => {
      this.ticket = res;
      this.urlEdit = `/user/ticket/ingreso/${this.ticket.catalogo.catalogo_id}/${this.ticket.ticket_id}`;
      this.isOpen = ![13, 14].includes(this.ticket.estado.parametros_id);
    });
  }
}
