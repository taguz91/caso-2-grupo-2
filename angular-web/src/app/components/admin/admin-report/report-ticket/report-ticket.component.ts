import { Component, OnInit } from '@angular/core';
import { TicketView} from 'src/app/models/ticket';
import { PageMetadata} from '../../../../models/parametros';
import {DEFAULT_PAGE_METADA, DEFAULT_PAGE_SIZE} from '../../../../utils/constantes';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { ReporteService } from '../../../../services/reporte.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-report-ticket',
  templateUrl: './report-ticket.component.html',
  styleUrls: ['./report-ticket.component.scss']
})
export class ReportTicketComponent implements OnInit {

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
    this.ticketsAll(9);
  }
  constructor(private breadcrumb: BreadcrumbService,
    private ticketService: TicketService,
    private _reporte: ReporteService) {
     }

  ngOnInit(): void {
    this.breadcrumb.addRutes([
      {
        label: 'Reporte Ticket',
        toUrl: 'admin/reportes/admin-report',
      },
    ]);
  }

  ticketsAll(estad: number) {
    this.ticketService.allByEstado(estad,this.actualPage).subscribe((response) => {
      this.tickets=response.data;
      switch (estad) {
        case 9:
          this.titles = this.nuevosTitle();
          this.values = this.nuevosData();
          break;

        case 10:
          this.titles = this.atendiendoseTitle();
          this.values = this.atendiendoseData();
          break;
        case 11:
            this.titles = this.rechazadoTitle();
            this.values = this.rechazadoData();
            break;

        case 13:
          this.titles = this.conSolucionTitle();
          this.values = this.cerradoData();
          break;

        case 14:
          this.titles = this.sinSolucionTitle();
          this.values = this.cerradoData();
          break;
        default:
          break;
      }
    })
  }

  GetReporte() {
    this._reporte.reporte('ticket');
  }
  exportAsXLSX(){
    this._reporte.exportToExcel(this.values,'ExportEvaluate');
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
    const values:any= [];
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
}
