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

    if (!this.validar_cedula(user.cedula)) {
      return false;
    }

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

  validar_cedula(cedula: string) {
    if (Boolean(cedula) && cedula.length > 0) {
      if (this.is_cedula(cedula)) {
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

  is_cedula(cedula: string) {

    if (cedula.length === 10) {
      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);
  
      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(0) && digitoRegion <= String(24)) {
  
        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));
  
        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
  
        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
  
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
  
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
  
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
  
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
  
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
  
        // Suma total
        const sumaTotal = (pares + impares);
  
        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
  
        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;
  
        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;
  
        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
  
        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
  
      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }
  }
}