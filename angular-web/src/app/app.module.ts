import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TipoServicioComponent } from './components/user/tipo-servicio/tipo-servicio.component';
import { HeaderRegistroTicketComponent } from './components/user/header-registro-ticket/header-registro-ticket.component';
import { UserCatalogoServicioComponent } from './components/user/user-catalogo-servicio/user-catalogo-servicio.component';
import { UserRegistroTicketComponent } from './components/user/user-registro-ticket/user-registro-ticket.component';
import { UserPerfilComponent } from './components/user/user-perfil/user-perfil.component';
import { CriticidadService } from './services/criticidad.service';
import { EncuesatisComponent } from './components/user/encuesatis/encuesatis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserTicketComponent } from './components/user/user-ticket/user-ticket.component';
import { TicketsEstadoComponent } from './components/admin/tickets-estado/tickets-estado.component';
import { BreadcrumbComponent } from './components/admin/breadcrumb/breadcrumb.component';
import { AdminAlertComponent } from './components/admin/admin-alert/admin-alert.component';
import { UserAlertComponent } from './components/user/user-alert/user-alert.component';
import { FloatingButtonComponent } from './components/user/floating-button/floating-button.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserLayoutComponent,
    EmptyLayoutComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AdminLayoutComponent,
    TipoServicioComponent,
    HeaderRegistroTicketComponent,
    UserCatalogoServicioComponent,
    UserRegistroTicketComponent,
    UserPerfilComponent,
    EncuesatisComponent,
    UserTicketComponent,
    TicketsEstadoComponent,
    BreadcrumbComponent,
    AdminAlertComponent,
    UserAlertComponent,
    FloatingButtonComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CriticidadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
