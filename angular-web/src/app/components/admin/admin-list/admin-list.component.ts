import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  administradores: Usuario[] = []
  rol: string = 'Unknow'

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  loadAllUsers() {
    //    this.usuarioService.
  }

}
