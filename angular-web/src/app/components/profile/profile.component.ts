import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginUser, Usuario } from 'src/app/models/usuario';
import { SessionService } from 'src/app/services/session.service';
import { UsuarioService } from '../../services/usuario.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario = new Usuario();
  user: LoginUser;

  constructor(
    private sessionService: SessionService,
    public modal: NgbModal,
    private userService: UsuarioService,
    private localService: LocalService,
  ) {
    this.localService.load_js('registro-usuario.component.js');
  }

  ngOnInit(): void {
    this.localService.load_js('registro-usuario.component.js');
    this.loadUser();
  }

  loadUser() {
    const user = this.sessionService.user;
    this.sessionService.getUser().subscribe((_) => this.loadUser());
    if (user) {
      this.user = user;
    }
    this.userService.readUserById(this.user.personaId).subscribe(data => {
      if (data != null) {
        this.usuario = data;
      }
    });
  }

}
