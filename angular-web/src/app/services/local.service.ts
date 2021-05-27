import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  $emitter_create_user = new EventEmitter();
  $emitter_update_user = new EventEmitter();
  $emitter_list_user = new EventEmitter();

  load_js(file: string) {
    let script = document.createElement('script')
    script.src = `./assets/js/${file}`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
  }
  
  emmiterCreateUser(rol: number) {
    this.$emitter_create_user.emit(rol);
  }

  emmiterUpdateUser(user: Usuario) {
    this.$emitter_update_user.emit(user);
  }

  emmiterListUser(idRol: number) {
    this.$emitter_list_user.emit(idRol);
  }

  is_cedula(cedula: string) {
    let cedulaCorrecta = false;
    if (cedula.length == 10)
    
    {    
        let tercerDigito = parseInt(cedula.substring(2, 3));
        if (tercerDigito < 6) {
            let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
            let verificador = parseInt(cedula.substring(9, 10));
            let suma:number = 0;
            let digito:number = 0;

            for (let i = 0; i < (cedula.length - 1); i++) {
                digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
                suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
            }

            suma= Math.round(suma);

            if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                cedulaCorrecta = true;
            } else if ((10 - (Math.round(suma % 10))) == verificador) {
                cedulaCorrecta = true;
            } else {
                cedulaCorrecta = false;
            }
        } else {
            cedulaCorrecta = false;
        }
    } else {
        cedulaCorrecta = false;
    }
    return cedulaCorrecta;
  }
}