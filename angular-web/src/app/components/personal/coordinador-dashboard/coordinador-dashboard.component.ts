import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FloatingOption, PageMetadata } from 'src/app/models/Parametros';
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

  isLastNuevos: boolean = false;
  isLastAsignados: boolean = false;

  private pageNuevo: number = 0;
  private pageAsignado: number = 0;

  @ViewChild('modalBuscar')
  private modalBuscar: TemplateRef<any>;

  floatingButtons: FloatingOption[] = [
    {
      icon: 'add',
      tooltip: 'Crear ticket',
      callback: () => this.triggerModal(this.modalBuscar),
    },
  ];

  constructor(
    private ticketService: TicketService,
    private modalService: NgbModal
  ) {}

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
        this.isLastNuevos = this.pageNuevo + 1 === res.meta.pages;
        this.pageMetadaNuevos = res.meta;
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
        this.isLastAsignados = this.pageAsignado + 1 === res.meta.pages;
        this.pageMetadaAsignados = res.meta;
      });
  }

  loadMoreAsignados() {
    this.loadingAsignados = true;
    this.pageAsignado++;
    this.loadTicketsAsignados();
  }

  triggerModal(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      modalDialogClass:
        ' modal-dialog-centered modal-dialog-scrollable modal-lg',
    }).result;
  }
}
