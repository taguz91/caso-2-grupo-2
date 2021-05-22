import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  
  administradores: Usuario[] = []
  rol: string = 'Unknow'
  
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.usuarioService.readAllUsersByRol(3).subscribe(data => {
      if (data.length > 0) {
        this.administradores = data;
        this.dtTrigger.next()
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
