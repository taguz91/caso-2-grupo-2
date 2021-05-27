import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CategoriaRegisterComponent } from './components/admin/categoria-register/categoria-register.component';
import { CriticidadService } from './services/criticidad.service';
import { EncuesatisComponent } from './components/user/encuesatis/encuesatis.component';
import { UserTicketComponent } from './components/user/user-ticket/user-ticket.component';
import { TicketsEstadoComponent } from './components/admin/tickets-estado/tickets-estado.component';
import { BreadcrumbComponent } from './components/admin/breadcrumb/breadcrumb.component';
import { AdminAlertComponent } from './components/admin/admin-alert/admin-alert.component';
import { UserAlertComponent } from './components/user/user-alert/user-alert.component';
import { FloatingButtonComponent } from './components/user/floating-button/floating-button.component';
import { RegisterComponent } from './components/register/register.component';
import { ServicioRegisterComponent } from './components/admin/servicio-register/servicio-register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';
import { SoporteDashboardComponent } from './components/personal/soporte-dashboard/soporte-dashboard.component';
import { CoordinadorDashboardComponent } from './components/personal/coordinador-dashboard/coordinador-dashboard.component';
import { PersonalLayoutComponent } from './layouts/personal-layout/personal-layout.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ListFloatingButtonComponent } from './components/common/list-floating-button/list-floating-button.component';
import { ModalAsignarComponent } from './components/personal/modal-asignar/modal-asignar.component';
import { ModalCerrarComponent } from './components/personal/modal-cerrar/modal-cerrar.component';
import { ModalRechazarComponent } from './components/personal/modal-rechazar/modal-rechazar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxEchartsModule } from 'ngx-echarts';
import { CatalogoComponent } from './components/admin/catalogo/catalogo.component';
import { FormCatalogoComponent } from './components/admin/form-catalogo/form-catalogo.component';
import { TicketPreviewComponent } from './components/common/ticket-preview/ticket-preview.component';
import { ModalFindComponent } from './components/personal/modal-find/modal-find.component';
import { AdminReportComponent } from './components/admin/admin-report/admin-report.component';
import { ReportUsuarioComponent } from './components/admin/admin-report/report-usuario/report-usuario.component';
import { ReportTicketComponent } from './components/admin/admin-report/report-ticket/report-ticket.component';
import { ReportCatalogoComponent } from './components/admin/admin-report/report-catalogo/report-catalogo.component';

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
    CategoriaRegisterComponent,
    EncuesatisComponent,
    UserTicketComponent,
    TicketsEstadoComponent,
    BreadcrumbComponent,
    AdminAlertComponent,
    UserAlertComponent,
    FloatingButtonComponent,
    RegisterComponent,
    ServicioRegisterComponent,
    AdminRegisterComponent,
    AdminListComponent,
    SoporteDashboardComponent,
    CoordinadorDashboardComponent,
    PersonalLayoutComponent,
    FooterComponent,
    ListFloatingButtonComponent,
    ModalAsignarComponent,
    ModalCerrarComponent,
    ModalRechazarComponent,
    CatalogoComponent,
    FormCatalogoComponent,
    TicketPreviewComponent,
    ModalFindComponent,
    AdminReportComponent,
    ReportUsuarioComponent,
    ReportTicketComponent,
    ReportCatalogoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [CriticidadService],
  bootstrap: [AppComponent],
})
export class AppModule {}
