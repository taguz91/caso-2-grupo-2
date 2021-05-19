import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LocalService } from '../../services/local.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmar_pass: string;
  response_condicion: boolean;
  response_msg: string;

  constructor(private localService:LocalService, private usuarioService:UsuarioService, private router: Router) {
    this.localService.load_js('registro-usuario.component.js');
  }

  ngOnInit(): void {
    this.localService.load_js('registro-usuario.component.js');
  }

  registrar() {
    if (this.validarUsuario(this.usuario)) {
      this.response_condicion = false;
      this.response_msg = null;
      this.usuarioService.createUser(this.usuario, 3).subscribe(data => {
        this.usuario = new Usuario();
        try {
          var user: Usuario;
          user = data;

          if (user != null) {
            this.usuario = new Usuario();
          }

        } catch (error) {
          
        }
      });
    }
  }

  back() {
    this.router.navigate([''])
  }

  //Validaciones

  validarUsuario(user: Usuario):boolean {

    if (Boolean(user.password) && user.password.length > 0 && Boolean(this.confirmar_pass) && this.confirmar_pass.length > 0) {
      if (user.password != this.confirmar_pass) {
        this.show_response('Contraseña y confirmar contraseña son distintas');
        return false;
      }
    } else {
      this.show_response('Contraseña vacía');
      return false;
    }

    if (!this.validar_correo(user.correo)) {
      return false;
    }

    if (!this.validar_nombres([user.apellidos, user.nombres])) {
      return false;
    }
     
    return true;
  }

  validar_nombres(nombres: string[]): boolean {

    for (let n of nombres) {
      if (Boolean(n) && n.length > 0) {
        return true;
      } else {
        this.show_response('Nombre o apellido vacío');
        return false;
      }
    }
  }

  validar_correo(correo: string) {
    if (Boolean(correo) && correo.length > 0) {

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (correo.match(EMAIL_REGEX) && correo.length > 5) {

        return true;

      } else {
        this.show_response('Formato del correo incorrecto');
      }
    } else {
      this.show_response('Correo vacío');
      return false;
    }
  }

  validar_telefono(telefono: string) {
    if ((true)) {

      var TELEFONO_REGEX = /^[0-9]{10,15}/;

      if (telefono.match(TELEFONO_REGEX)) {
        return true;
      } else {
        this.show_response('Formato del feléfono incorrecto');
        return false;
      }
    } else {
      this.show_response('Teléfono/Celular vacío');
      return false;
    }
  }

  show_response(msg: string) {
    this.response_condicion = true;
    this.response_msg = msg;
  }
}
