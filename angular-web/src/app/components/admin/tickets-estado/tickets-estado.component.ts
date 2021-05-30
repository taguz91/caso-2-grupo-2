import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { PageMetadata, PageResponse } from 'src/app/models/Parametros';
import { TicketView } from 'src/app/models/ticket';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { TicketService } from 'src/app/services/ticket.service';
import { ReporteService } from '../../../services/reporte.service';
import {
  DEFAULT_PAGE_METADA,
  DEFAULT_PAGE_SIZE,
  TICKET_ESTADO_ABIERTO,
  TICKET_ESTADO_ATENDIENDOSE,
  TICKET_ESTADO_CERRADO_CON_SOLUCION,
  TICKET_ESTADO_CERRADO_SIN_SOLUCION,
  TICKET_ESTADO_RECHAZADO,
} from 'src/app/utils/constantes';

@Component({
  selector: 'app-tickets-estado',
  templateUrl: './tickets-estado.component.html',
  styleUrls: ['./tickets-estado.component.scss'],
})
export class TicketsEstadoComponent implements OnInit {
  estado: number = 0;
  tickets: TicketView[] = [];
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;
  perPage: number = DEFAULT_PAGE_SIZE;
  actualPage: number = 0;
  title: string = '';

  titles: string[] = [];
  values: any[] = [];
  loading: boolean = false;

  get page() {
    return this.actualPage + 1;
  }

  set page(page: number) {
    this.actualPage = page - 1;
    this.loadTickets();
  }

  constructor(
    private breadcrumb: BreadcrumbService,
    private activeRoute: ActivatedRoute,
    private ticketService: TicketService,
    private _reporte: ReporteService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const id = params.idEstado;
      if (id) {
        this.estado = parseInt(id);
        this.loadTickets();
        console.log(this.loadTickets())
      }
    });
  }

  private loadTickets() {
    this.loading = true;
    this.ticketService
      .allByEstado(this.estado, this.actualPage)
      .subscribe(this.mapResponse.bind(this));
  }

  searchTickets(q: string) {
    this.actualPage = 0;
    if (q.length === 0) {
      this.loadTickets();
    } else {
      this.loading = true;
      this.ticketService
        .searchByEstado(q, this.estado, this.actualPage)
        .subscribe(this.mapResponse.bind(this));
    }
  }

  private mapResponse(data: PageResponse<TicketView[]>) {
    this.tickets = data.data;
    this.pageMetada = data.meta;
    console.log(data.data)
    if (this.tickets.length > 0) {
      this.title = this.tickets[0].estado.nombre;
    } else {
      this.title = this.estado.toString();
    }

    this.breadcrumb.addRutes([
      {
        label: `Tickets ${this.title}`,
        toUrl: `/admin/tickets/${this.estado}`,
      },
    ]);
    console.log(this.estado);
    switch (this.estado) {
      case TICKET_ESTADO_ABIERTO:
        this.titles = this.nuevosTitle();
        this.values = this.nuevosData();
        break;

      case TICKET_ESTADO_ATENDIENDOSE:
        this.titles = this.atendiendoseTitle();
        this.values = this.atendiendoseData();
        break;

      case TICKET_ESTADO_CERRADO_CON_SOLUCION:
        this.titles = this.conSolucionTitle();
        this.values = this.cerradoData();
        break;

      case TICKET_ESTADO_CERRADO_SIN_SOLUCION:
        this.titles = this.sinSolucionTitle();
        this.values = this.cerradoData();
        break;

      case TICKET_ESTADO_RECHAZADO:
        this.titles = this.rechazadoTitle();
        this.values = this.rechazadoData();
        break;

      default:
        break;
    }
    this.loading = false;
  }

  private nuevosTitle(): string[] {
    return [
      'Usuario',
      'Correo',
      'Telefono',
      'Titulo',
      'Impacto Usuario',
      'Servicio',
      'Impacto Catalogo',
      'Prioridad',
      'Criticidad',
    ];
  }

  private atendiendoseTitle(): string[] {
    return [
      'Responsable',
      'Rol',
      'Fecha Asignación',
      'Usuario',
      'Correo',
      'Telefono',
      'Titulo',
      'Servicio',
    ];
  }

  private conSolucionTitle(): string[] {
    return [
      'Fecha Asignación',
      'Usuario',
      'Titulo',
      'Servicio',
      'Responsable Solución',
      'Fecha Solución',
      'Solución',
    ];
  }

  private sinSolucionTitle(): string[] {
    return [
      'Fecha Asignación',
      'Usuario',
      'Titulo',
      'Servicio',
      'Responsable',
      'Fecha Cierre',
      'Motivo',
    ];
  }

  private rechazadoTitle(): string[] {
    return [
      'Usuario',
      'Titulo',
      'Servicio',
      'Rechazado por',
      'Fecha Rechazo',
      'Motivo',
    ];
  }

  private nuevosData(): any[] {
    const values = [];
    this.tickets.forEach((ticket) => {
      values.push([
        ticket.usuario.nombreCompleto,
        ticket.usuario.correo,
        ticket.usuario.telefono,
        ticket.titulo,
        ticket.impacto.nombre,
        ticket.catalogo.descripcion,
        ticket.catalogo.sla.impacto.nombre,
        ticket.catalogo.sla.nivelPrioridad.nombre,
        ticket.catalogo.sla.criticidad.nombre,
      ]);
    });
    return values;
  }

  private atendiendoseData(): any[] {
    const values = [];
    this.tickets.forEach((ticket) => {
      values.push([
        ticket.responsable.nombreCompleto,
        ticket.responsable.rol.nombre,
        ticket.fechaAsignacion,
        ticket.usuario.nombreCompleto,
        ticket.usuario.correo,
        ticket.usuario.telefono,
        ticket.titulo,
        ticket.catalogo.descripcion,
      ]);
    });
    return values;
  }

  private cerradoData(): any[] {
    const values = [];
    this.tickets.forEach((ticket) => {
      values.push([
        ticket.fechaAsignacion,
        ticket.usuario.nombreCompleto,
        ticket.titulo,
        ticket.catalogo.descripcion,
        ticket.responsableSolucion.nombreCompleto,
        ticket.fechaSolucion,
        ticket.solucion,
      ]);
    });
    return values;
  }

  private rechazadoData(): any[] {
    const values = [];
    this.tickets.forEach((ticket) => {
      values.push([
        ticket.usuario.nombreCompleto,
        ticket.titulo,
        ticket.catalogo.descripcion,
        ticket.responsableSolucion.nombreCompleto,
        ticket.fechaSolucion,
        ticket.solucion,
      ]);
    });
    return values;
  }

  GetReporte() {
    this._reporte.reporte('ticket');
  }
}
