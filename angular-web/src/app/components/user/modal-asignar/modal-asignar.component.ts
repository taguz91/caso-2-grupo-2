import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketView } from 'src/app/models/ticket';
import { ComboUsuario } from 'src/app/models/usuario';
import { TicketService } from 'src/app/services/ticket.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ROL_SOPORTE_N1, ROL_SOPORTE_N2 } from 'src/app/utils/constantes';

@Component({
  selector: 'app-modal-asignar',
  templateUrl: './modal-asignar.component.html',
  styleUrls: ['./modal-asignar.component.scss'],
})
export class ModalAsignarComponent implements OnInit {
  @Input() ticket: TicketView;
  @Input() modal: any;
  loading: boolean = false;
  usuarios: ComboUsuario[] = [];
  formTitle: string = 'Asignar Soporte N1';

  asignacionForm = new FormGroup({
    ticketId: new FormControl(0, [Validators.required]),
    soporteId: new FormControl('', [Validators.required]),
  });

  constructor(
    private usuarioService: UsuarioService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
    this.initForm();
  }

  private initForm() {
    this.ticketId.setValue(this.ticket.ticket_id);
  }

  onSave() {
    if (!this.asignacionForm.valid) return;
    this.ticketService
      .asignarTicket(this.asignacionForm.value)
      .subscribe((res) => {
        this.ticket = res;
        this.modal.dismiss('Cross click');
        window.location.reload();
      });
  }

  get ticketId() {
    return this.asignacionForm.get('ticketId');
  }

  get soporteId() {
    return this.asignacionForm.get('soporteId');
  }

  private loadUsuarios() {
    let type = ROL_SOPORTE_N1;
    if (this.ticket.responsable) {
      type = ROL_SOPORTE_N2;
      this.formTitle = 'Reasignar Soporte N2';
    }
    this.usuarioService
      .getComboByType(type)
      .subscribe((res) => (this.usuarios = res));
  }
}
