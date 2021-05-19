import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  load_js(file: string) {
    let script = document.createElement('script')
    script.src = `./assets/js/${file}`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
  }
}
