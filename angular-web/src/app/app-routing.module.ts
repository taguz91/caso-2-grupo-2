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
import { SoporteDashboardComponent } from './components/personal/soporte-dashboard/soporte-dashboard.component';
import { CoordinadorDashboardComponent } from './components/personal/coordinador-dashboard/coordinador-dashboard.component';
import { PersonalLayoutComponent } from './layouts/personal-layout/personal-layout.component';

const routes: Routes = [
  // Public rutes goes here
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      {
        path: 'registrarse',
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
        path: 'encuesta/:idTicket',
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
        path: 'home',
        component: AdminDashboardComponent,
      },
      {
        path: 'categorias',
<<<<<<< HEAD
        component: CategoriaRegisterComponent
=======
        component: CategoriaRegisterComponent,
>>>>>>> 512c9f1d93bebab6b3003c3a17d1227981516113
      },
      {
        path: 'tickets/estado/:idEstado',
        component: TicketsEstadoComponent,
      },
      {
        path: 'servicios',
        component: ServicioRegisterComponent,
      },
      {
        path: 'administradores',
        component: AdminListComponent,
      },
    ],
  },

  // Layout for soporte and coordinador
  {
    path: 'dashboard',
    component: PersonalLayoutComponent,
    children: [
      {
        path: 'soporte',
        component: SoporteDashboardComponent,
      },
      {
<<<<<<< HEAD
        path: 'admin-list',
        component: AdminListComponent
=======
        path: 'coordinador',
        component: CoordinadorDashboardComponent,
      },
      {
        path: 'ticket/:idTicket',
        component: UserTicketComponent,
>>>>>>> 512c9f1d93bebab6b3003c3a17d1227981516113
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
