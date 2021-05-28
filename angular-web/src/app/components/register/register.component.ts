import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LocalService } from '../../services/local.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { JWT_NAME } from 'src/app/utils/constantes';

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

  constructor (
      private localService:LocalService,
      private usuarioService:UsuarioService,
      private router: Router ) {

    this.localService.load_js('registro-usuario.component.js');
  }

  ngOnInit(): void {
    this.localService.load_js('registro-usuario.component.js');
  }

  registrar() {
    if (this.validarUsuario(this.usuario)) {
      
      this.response_condicion = false;
      this.response_msg = null;
      this.router.navigate(['user/home'])

      this.usuarioService.createUser(this.usuario, 3).subscribe(data => {

        try {
          var user: Usuario;
          user = data;

          if (user != null && this.usuario.correo == user.correo) {

            this.usuario = new Usuario();
            this.confirmar_pass = null;
            sessionStorage.setItem(JWT_NAME, user.token);
            localStorage.setItem(JWT_NAME, user.token);
            this.router.navigate(['user/home'])
          }

        } catch (error) {
          this.show_response('Error Desconocido');
        }
      });
    }
  }

  back() {
    this.router.navigate([''])
  }

  //Validaciones

  validarUsuario(user: Usuario):boolean {

    if (!this.validar_correo(user.correo)) {
      return false;
    }

    if (!this.validar_nombres([user.apellidos, user.nombres])) {
      return false;
    }

    if (this.validar_cedula(user.cedula) == false) {
      return false;
    }

    if (!this.validar_telefono(user.telefono)) {
      return false;
    }

    if (!this.validar_password(user.password)) {
      return false;
    }
     
    return true;
  }

  validar_password(password: string) {
    if (Boolean(password) && password.length > 0 && Boolean(this.confirmar_pass) && this.confirmar_pass.length > 0) {
      if (password != this.confirmar_pass) {
        this.show_response('Contraseña y confirmar contraseña son distintas');
        return false;
      } else {
        return true;
      }
    } else {
      this.show_response('Contraseña vacía');
      return false;
    }
  }

  validar_nombres(nombres: string[]): boolean {

    for (let n of nombres) {
      if (Boolean(n) && n.length > 0) {

        var NAMES_REGEX = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{1,50}/;

        if (!n.match(NAMES_REGEX)) {
          this.show_response('Formato del nombre o apellido incorrecto');
          return false;
        }

      } else {
        this.show_response('Nombre o apellido vacío');
        return false;
      }
    }
    
    return true;
  }

  validar_correo(correo: string) {
    if (Boolean(correo) && correo.length > 0) {

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (correo.match(EMAIL_REGEX) && correo.length > 5) {

        return true;

      } else {
        this.show_response('Formato del correo incorrecto');
        return false
      }
    } else {
      this.show_response('Correo vacío');
      return false;
    }
  }

  validar_telefono(telefono: string) {

    if ((Boolean(telefono) && telefono.length > 0)) {

      var TELEFONO_REGEX = /^[0-9]{10,15}/;

      if (telefono.match(TELEFONO_REGEX) && telefono.length >= 10 && telefono.length <= 15) {
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

  validar_cedula(cedula: string):boolean {

    if (Boolean(cedula) && cedula.length > 0) {
      if (this.localService.is_cedula(cedula)) {
        this.usuarioService.readUserByCedula(cedula).subscribe(data => {
          try {
            if (data != null && data.cedula == cedula) {
              this.show_response('Cédula existente');
              return false;
            } else {
              return true;
            }
          } catch (error) {
            this.show_response('Error desconocido');
            return false;
          }
        });
      } else {
        this.show_response('Formato de la cédula incorrecta');
        return false;
      }
    } else {
      this.show_response('Cédula vacía');
      return false;
    }
  }

  show_response(msg: string) {
    this.response_condicion = true;
    this.response_msg = msg;
  }
}