import { Component, OnInit } from '@angular/core';
import { SectionMenu } from 'src/app/models/types';
import { LoginUser } from 'src/app/models/usuario';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import {
  TICKET_ESTADO_ABIERTO,
  TICKET_ESTADO_ATENDIENDOSE,
  TICKET_ESTADO_CERRADO_CON_SOLUCION,
  TICKET_ESTADO_CERRADO_SIN_SOLUCION,
  TICKET_ESTADO_RECHAZADO,
} from 'src/app/utils/constantes';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  user: LoginUser;
  menu: SectionMenu[] = [
    {
      section: 'Configuración',
      options: [
        {
          label: 'Home',
          icon: 'home',
          urlTo: '/admin/home',
        },
        {
          label: 'Categorias',
          icon: 'dashboard',
          urlTo: '/admin/categorias',
        },
        {
          label: 'Servicios',
          icon: 'dashboard',
          urlTo: '/admin/servicios',
        },
        {
          label: 'Catalogo',
          icon: 'dashboard',
          urlTo: '/admin/catalogo',
        },
      ],
    },
    {
      section: 'Tickets',
      options: [
        {
          label: 'Nuevos',
          icon: 'receipt',
          urlTo: `/admin/tickets/estado/${TICKET_ESTADO_ABIERTO}`,
        },
        {
          label: 'Atendiendose',
          icon: 'receipt',
          urlTo: `/admin/tickets/estado/${TICKET_ESTADO_ATENDIENDOSE}`,
        },
        {
          label: 'Cerrados con solución',
          icon: 'receipt',
          urlTo: `/admin/tickets/estado/${TICKET_ESTADO_CERRADO_CON_SOLUCION}`,
        },
        {
          label: 'Cerrados sin solución',
          icon: 'receipt',
          urlTo: `/admin/tickets/estado/${TICKET_ESTADO_CERRADO_SIN_SOLUCION}`,
        },
        {
          label: 'Rechazado',
          icon: 'receipt',
          urlTo: `/admin/tickets/estado/${TICKET_ESTADO_RECHAZADO}`,
        },
        {
          label: 'Encuestas',
          icon: 'receipt_long',
          urlTo: '/admin/tickets/encuestas',
        },
      ],
    },
    {
      section: 'Administración',
      options: [
        {
          label: 'Administradores',
          icon: 'manage_accounts',
          urlTo: 'administradores/rol/2',
        },
        {
          label: 'Usuarios',
          icon: 'manage_accounts',
          urlTo: 'usuarios/rol/3',
        },
        {
          label: 'Coordinadores',
          icon: 'manage_accounts',
          urlTo: 'coordinadores/rol/4',
        },
        {
          label: 'Soporte N1',
          icon: 'manage_accounts',
          urlTo: 'soporte-n1/rol/5',
        },
        {
          label: 'Soporte N2',
          icon: 'manage_accounts',
          urlTo: 'soporte-n2/rol/6',
        },
      ],
    },
    {
      section: 'Reportes',
      options: [
        {
          label: 'Graficas',
          icon: 'leaderboard',
          urlTo: '/admin/reportes/graficas',
        },
        {
          label: 'PDF',
          icon: 'picture_as_pdf',
          urlTo: '/admin/reportes/pdf',
        },
        {
          label: 'Excel',
          icon: 'table_chart',
          urlTo: '/admin/reportes/excel',
        },
      ],
    },
  ];

  constructor(
    private sessionService: SessionService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.addRutes([]);
    const user = this.sessionService.user;
    if (user) {
      this.user = user;
    } else {
      this.sessionService.getUser().subscribe((user) => (this.user = user));
    }
  }

  logout() {
    this.sessionService.logout();
  }
}
