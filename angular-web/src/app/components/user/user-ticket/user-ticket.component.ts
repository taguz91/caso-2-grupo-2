import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketView } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss'],
})
export class UserTicketComponent implements OnInit {
  private ticketId: number = 0;
  ticket: TicketView;

  // Es solo para testing
  historial: string[] = [
    'Coordinador Eddison asigna caso a Pepe',
    'Se actualiza el estado a en revision',
    'Johnny Garcia, actualiza el titulo del incidente a, ticket.',
    'Se sube el ticket a nivel dos',
    'Se cierra el ticket por ',
  ];

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
    });
  }
}
