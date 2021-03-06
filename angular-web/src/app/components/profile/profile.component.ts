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
  confirmar_pass: string;
  response_condicion: boolean;
  response_msg: string;

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
  
  updateUser(modal) {

    if (this.validarUsuario(this.usuario)) {

      this.userService.updateUser(this.usuario).subscribe(data => {
        if (data.status) {
          this.modal.dismissAll(modal)
        } else {
          this.show_response(data.msg);
        }
      });
    }
  }
    //Validaciones

    validarUsuario(user: Usuario):boolean {

      if (!this.validar_correo(user.correo)) {
        return false;
      }
  
      if (!this.validar_nombres([user.apellidos, user.nombres])) {
        return false;
      }
  
      if (!this.validar_cedula(user.cedula)) {
        return false;
      }
  
      if (!this.validar_telefono(user.telefono)) {
        return false;
      }
       
      return true;
    }
  
    validar_nombres(nombres: string[]): boolean {

      for (let n of nombres) {
        if (Boolean(n) && n.length > 0) {
  
          var NAMES_REGEX = /^[a-zA-Z??-??\u00f1\u00d1 ]{1,50}$/;
  
          if (!n.match(NAMES_REGEX)) {
            this.show_response('Formato del nombre o apellido incorrecto');
            return false;
          }
  
        } else {
          this.show_response('Nombre o apellido vac??o');
          return false;
        }
      }
      
      return true;
    }
  
    validar_correo(correo: string) {
      if (Boolean(correo) && correo.length > 0) {
  
        var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&???*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
        if (correo.match(EMAIL_REGEX) && correo.length > 5) {
  
          return true;
  
        } else {
          this.show_response('Formato del correo incorrecto');
          return false
        }
      } else {
        this.show_response('Correo vac??o');
        return false;
      }
    }
  
    validar_telefono(telefono: string) {
  
      if ((Boolean(telefono) && telefono.length > 0)) {
  
        var TELEFONO_REGEX = /^[\d*]{10,15}$/;
  
        if (telefono.match(TELEFONO_REGEX) && telefono.length >= 10 && telefono.length <= 15) {
          return true;
        } else {
          this.show_response('Formato del fel??fono incorrecto');
          return false;
        }
      } else {
        this.show_response('Tel??fono/Celular vac??o');
        return false;
      }
    }
  
    validar_cedula(cedula: string):boolean {
  
      if (Boolean(cedula) && cedula.length > 0) {
        if (this.localService.is_cedula(cedula)) {
          return true;
        } else {
          this.show_response('Formato de la c??dula incorrecta');
          return false;
        }
      } else {
        this.show_response('C??dula vac??a');
        return false;
      }
    }
  
    show_response(msg: string) {
      this.response_condicion = true;
      this.response_msg = msg;
    }
}
