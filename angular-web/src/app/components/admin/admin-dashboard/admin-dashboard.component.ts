import { Component, OnInit } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { TicketService } from 'src/app/services/ticket.service';
import {
  TICKET_ESTADO_ABIERTO,
  TICKET_ESTADO_ATENDIENDOSE,
  TICKET_ESTADO_CERRADO_CON_SOLUCION,
  TICKET_ESTADO_CERRADO_SIN_SOLUCION,
  TICKET_ESTADO_RECHAZADO,
} from 'src/app/utils/constantes';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  options: EChartsOption;
  isLoading: boolean = false;
  private estadoAbierto = 'Abierto';
  private estadoAsignado = 'Asignado';
  private estadoCerradoCon = 'Cerrado con solucion';
  private estadoCerradoSin = 'Cerrado sin solucion';
  private estadoRechazado = 'Rechazado';

  constructor(
    private breadcrumb: BreadcrumbService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.breadcrumb.addRutes([]);
    this.loadReport();
  }

  private loadReport() {
    this.isLoading = true;
    this.ticketService.countByEstado().subscribe((res) => {
      const dayAbierto = this.getCountDay();
      const dayAsignado = this.getCountDay();
      const dayCerradoCon = this.getCountDay();
      const dayCerradoSin = this.getCountDay();
      const dayRechazado = this.getCountDay();
      res.forEach((count) => {
        switch (count.estado_id) {
          case TICKET_ESTADO_ABIERTO:
            dayAbierto[count.day] = count.total;
            break;
          case TICKET_ESTADO_ATENDIENDOSE:
            dayAsignado[count.day] = count.total;
            break;
          case TICKET_ESTADO_CERRADO_CON_SOLUCION:
            dayCerradoCon[count.day] = count.total;
            break;
          case TICKET_ESTADO_CERRADO_SIN_SOLUCION:
            dayCerradoSin[count.day] = count.total;
            break;
          case TICKET_ESTADO_RECHAZADO:
            dayRechazado[count.day] = count.total;
            break;
        }
      });

      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: [
            this.estadoAbierto,
            this.estadoAsignado,
            this.estadoCerradoCon,
            this.estadoCerradoSin,
            this.estadoRechazado,
          ],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              'Domingo',
              'Lunes',
              'Martes',
              'Miercoles',
              'Jueves',
              'Viernes',
              'Sabado',
            ],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          this.getSerie(this.estadoAbierto, dayAbierto),
          this.getSerie(this.estadoAsignado, dayAsignado),
          this.getSerie(this.estadoCerradoCon, dayCerradoCon),
          this.getSerie(this.estadoCerradoSin, dayCerradoSin),
          this.getSerie(this.estadoRechazado, dayRechazado),
        ],
      };
      this.isLoading = false;
    });
  }

  private getSerie(estado: string, data: number[]): SeriesOption {
    return {
      name: estado,
      type: 'line',
      data: data,
      areaStyle: {},
      label: {
        show: true,
        position: 'top',
      },
    };
  }

  private getCountDay(): number[] {
    return [0, 0, 0, 0, 0, 0, 0];
  }
}
