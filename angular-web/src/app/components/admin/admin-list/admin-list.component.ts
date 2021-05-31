import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from '../../../services/local.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  administradores: Usuario[] = []
  dtTrigger: Subject<any> = new Subject<any>();
  rolId: number = 0; //Lista todos las ususarios con este ID
  rol_name: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private localService:LocalService,
    private activatedRoute: ActivatedRoute,
    private _reporte: ReporteService,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.rolId = this.activatedRoute.snapshot.params.id;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
      }
    };
    this.loadAllUsers();
    this.loadRolName();
  }

  loadAllUsers() {
    this.usuarioService.readAllUsersByRol(this.rolId).subscribe(data => {
      if (data.length > 0) {
        this.administradores = data;
        this.dtTrigger.next()
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  register() {
    let url = this.router.url.toString()
    this.router.navigate(['admin/admin-register']).finally(() => {
      this.localService.emmiterCreateUser(this.rolId);
    });
  }

  update(usuario: Usuario) {
    this.router.navigate(['admin/admin-register']).finally(() => {
      this.localService.emmiterUpdateUser(usuario);
    })
  }

  delete(usuario: Usuario) {

    let response = confirm(`¿Desea eliminar al usuario: ${usuario.nombres} ${usuario.apellidos}?`);

    if (response) {
      this.usuarioService.deleteUserById(usuario.personaId).subscribe(data => {

        if (data != null) {
          this.alertService.success(`${usuario.nombres} ${usuario.apellidos} fue eliminado exitosamente`);
          this.loadAllUsers();
        }
      });
    }
  }

  loadRolName() {
    if (this.rolId == 1) { this.rol_name = 'Desarrollador'; }
    else if (this.rolId == 2) { this.rol_name = 'Administrador'; }
    else if (this.rolId == 3) { this.rol_name = 'Usuario'; }
    else if (this.rolId == 4) { this.rol_name = 'Coordinador'; }
    else if (this.rolId == 5) { this.rol_name = 'Soporte N1'; }
    else if (this.rolId == 6) { this.rol_name = 'Soporte N2'; }
    else { this.rol_name = 'Otro Rol'; }
  }

  GetReporte(){
    this._reporte.reporte('tr');
  }
}
