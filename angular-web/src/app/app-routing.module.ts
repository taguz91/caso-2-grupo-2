import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CategoriaRegisterComponent } from './components/admin/categoria-register/categoria-register.component';
import { TicketsEstadoComponent } from './components/admin/tickets-estado/tickets-estado.component';
import { LoginComponent } from './components/login/login.component';
import { EncuesatisComponent } from './components/user/encuesatis/encuesatis.component';
import { TipoServicioComponent } from './components/user/tipo-servicio/tipo-servicio.component';
import { UserCatalogoServicioComponent } from './components/user/user-catalogo-servicio/user-catalogo-servicio.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { UserPerfilComponent } from './components/user/user-perfil/user-perfil.component';
import { UserRegistroTicketComponent } from './components/user/user-registro-ticket/user-registro-ticket.component';
import { UserTicketComponent } from './components/user/user-ticket/user-ticket.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { ServicioRegisterComponent } from './components/admin/servicio-register/servicio-register.component';
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';

const routes: Routes = [
  // Public rutes goes here
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      {
        path: 'user-register',
        component: RegisterComponent,
        pathMatch: 'full',
      },
    ],
  },

  // User rutes goes here

  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: 'home',
        component: UserDashboardComponent,
      },
      {
        path: 'ticket/tipo-servicio',
        component: TipoServicioComponent,
      },
      {
        path: 'ticket/servicios/:idTipo',
        component: UserCatalogoServicioComponent,
      },
      {
        path: 'ticket/ingreso/:idCatalogo',
        component: UserRegistroTicketComponent,
      },
      {
        path: 'ticket/ingreso/:idCatalogo/:idTicket',
        component: UserRegistroTicketComponent,
      },
      {
        path: 'perfil',
        component: UserPerfilComponent,
      },
      {
        path: 'ticket/:idTicket',
        component: UserTicketComponent,
      },
      {
        path: 'encuesta',
        component: EncuesatisComponent,
      },
    ],
  },

  // Admin rutes goes here
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'categorias',
        component: CategoriaRegisterComponent
      },
      {
        path: 'tickets/estado/:idEstado',
        component: TicketsEstadoComponent
      },
      {
        path: 'servicios',
        component: ServicioRegisterComponent
      },
      {
        path: 'admin-list',
        component: AdminListComponent
      },
    ],
  },

  // No layout rutes

  // Other routes redirect to login
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
