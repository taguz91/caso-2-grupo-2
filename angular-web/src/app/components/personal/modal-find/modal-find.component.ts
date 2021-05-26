import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-find',
  templateUrl: './modal-find.component.html',
  styleUrls: ['./modal-find.component.scss'],
})
export class ModalFindComponent implements OnInit {
  @Input() modal: NgbModalWindow;
  loading: boolean = false;
  usuario: Usuario;
  userNotExist: boolean = false;

  searchForm = new FormGroup({
    buscar: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(1000),
    ]),
  });

  get buscar() {
    return this.searchForm.get('buscar');
  }

  constructor(private userService: UsuarioService) {}

  ngOnInit(): void {}

  onSave() {
    if (!this.searchForm.valid) return;
    this.loading = true;
    this.userService.existUser(this.buscar.value).subscribe((res) => {
      this.usuario = res;
      if (res) {
        console.log('ENCONTRAMOS EL USAURIO');
        this.userNotExist = false;
      } else {
        console.log('El usuario no existe');
        this.userNotExist = true;
      }
      this.loading = false;
    });
  }
}
