import { Component, OnInit } from '@angular/core';
import { SectionMenu } from 'src/app/models/types';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  menu: SectionMenu[] = [
    {
      section: 'Configuración',
      options: [
        {
          label: 'Home',
          icon: 'home',
          urlTo: '/admin',
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
          urlTo: '/admin/tickets/estado/2',
        },
        {
          label: 'Cerrados con solución',
          icon: 'receipt',
          urlTo: '/admin/tickets/estado/1',
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
          label: 'Usuarios',
          icon: 'manage_accounts',
          urlTo: '/admin/usuarios/tipo/1',
        },
        {
          label: 'Coordinadores',
          icon: 'manage_accounts',
          urlTo: 'admin-list',
        },
        {
          label: 'Soporte',
          icon: 'manage_accounts',
          urlTo: '/admin/usuarios/tipo/3',
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

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {}

  logout() {
    this.sessionService.logout();
  }
}
