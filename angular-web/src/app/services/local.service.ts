import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  $emitter_update_user = new EventEmitter();
  $emitter_list_user = new EventEmitter();

  load_js(file: string) {
    let script = document.createElement('script')
    script.src = `./assets/js/${file}`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
  }

  emmiterUpdateUser(user: Usuario) {
    this.$emitter_update_user.emit(user);
  }

  emmiterListUser(idRol: number) {
    this.$emitter_list_user.emit(idRol);
  }
}
