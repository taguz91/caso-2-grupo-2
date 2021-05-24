import { Component, OnInit } from '@angular/core';
import { PageMetadata } from 'src/app/models/Parametros';
import { TicketHome } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import {
  DEFAULT_PAGE_METADA,
  TICKET_ESTADO_ABIERTO,
  TICKET_ESTADO_ATENDIENDOSE,
} from 'src/app/utils/constantes';

@Component({
  selector: 'app-coordinador-dashboard',
  templateUrl: './coordinador-dashboard.component.html',
  styleUrls: ['./coordinador-dashboard.component.scss'],
})
export class CoordinadorDashboardComponent implements OnInit {
  pageMetadaNuevos: PageMetadata = DEFAULT_PAGE_METADA;
  pageMetadaAsignados: PageMetadata = DEFAULT_PAGE_METADA;

  ticketsNuevos: TicketHome[] = [];
  ticketsAsignados: TicketHome[] = [];

  loadingNuevos: boolean = true;
  loadingAsignados: boolean = true;

  private pageNuevo: number = 0;
  private pageAsignado: number = 0;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTicketsNuevos();
    this.loadTicketsAsignados();
  }

  private loadTicketsNuevos() {
    this.ticketService
      .listByEstado(TICKET_ESTADO_ABIERTO, this.pageNuevo)
      .subscribe((res) => {
        this.ticketsNuevos.push(...res.data);
        this.loadingNuevos = false;
      });
  }

  loadMoreNuevos() {
    this.loadingNuevos = true;
    this.pageNuevo++;
    this.loadTicketsNuevos();
  }

  private loadTicketsAsignados() {
    this.ticketService
      .listByEstado(TICKET_ESTADO_ATENDIENDOSE, this.pageAsignado)
      .subscribe((res) => {
        this.ticketsAsignados.push(...res.data);
        this.loadingAsignados = false;
      });
  }

  loadMoreAsignados() {
    this.loadingAsignados = true;
    this.pageAsignado++;
    this.loadTicketsAsignados();
  }
}
