import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from '../../../services/local.service';

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

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private localService:LocalService,
    private activatedRoute: ActivatedRoute) { }

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
          alert(`${usuario.nombres} ${usuario.apellidos} fue eliminado`);
          this.loadAllUsers();
        }
      });
    }
  }
}
