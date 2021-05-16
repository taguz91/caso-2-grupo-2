import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
    UserPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CriticidadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
