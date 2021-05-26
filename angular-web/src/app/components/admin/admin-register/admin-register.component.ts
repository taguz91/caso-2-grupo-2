import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LocalService } from 'src/app/services/local.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {

  action: string = 'create';
  usuario: Usuario = new Usuario();
  confirmar_pass: string;
  response_condicion: boolean;
  response_msg: string;
  roles: Rol[] = []
  rolId: number;

  constructor (
      private localService:LocalService,
      private usuarioService:UsuarioService,
      private rolService: RolService ) {

    this.localService.load_js('registro-usuario.component.js');

    this.localService.$emitter_update_user.subscribe(data => {
      this.usuario = data;
      this.rolId = this.usuario.rol.rolId
      this.localService.load_js('registro-usuario.component.js');
      this.action = 'update';
    });

    this.localService.$emitter_create_user.subscribe(rol => {
      this.rolId = rol;
    });
  }

  ngOnInit(): void {
    this.loadAllRoles()
  }

  loadAllRoles() {
    this.rolService.readAllRoles().subscribe(data => {
      if (data != null) {
        this.roles = data;
      }
    });
  }

  guardar() {

    this.usuario.rol = this.getRolById(this.rolId);

    if (this.validarUsuario(this.usuario)) {

      console.log(this.action)
      
      this.response_condicion = false;
      this.response_msg = null;

      if (this.action == 'create') {
        this.create();
      } else if (this.action == 'update') {
        this.update();
      }
    }
  }

  create() {
    this.usuarioService.createUser(this.usuario, this.usuario.rol.rolId).subscribe(data => {

      console.log(this.usuario)
          
      try {
        var user: Usuario;
        user = data;
        
        if (user != null && this.usuario.correo == user.correo) {
          
          alert(`Usuario ${user.nombres} ${user.apellidos} registrado`);
          this.usuario = new Usuario();
          this.confirmar_pass = null;
        }        
      } catch (error) {
        this.show_response('Error Desconocido');
      }
    });
  }

  update() {
    this.usuarioService.updateUser(this.usuario).subscribe(data => {
          
      try {
        var user: Usuario;
        user = data;
        
        if (user != null && this.usuario.correo == user.correo) {
          this.updateRol(this.usuario.personaId, this.usuario.rol.rolId);
          alert(`Usuario ${user.nombres} ${user.apellidos} actualizado`);
        }        
      } catch (error) {
        this.show_response('Error Desconocido');
      }
    });
  }

  updateRol(user_id: number, rol_id: number) {
    this.usuarioService.updateUserRol(user_id, rol_id).subscribe(data => {
      if (data != null) {
        console.log(data)
      } else {
        alert('No se actualizó el rol');        
      }
    });
  }

  getRolById(id: number):Rol {
    for (let r of this.roles) {
      if (r.rolId == id) {
        return r;
      }
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
    if (!this.validar_telefono(user.telefono)) {
      return false;
    }
    if (!this.validar_password(user.password)) {
      return false;
    }
    if (this.usuario.rol == null) {
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

  show_response(msg: string) {
    this.response_condicion = true;
    this.response_msg = msg;
  }
}
