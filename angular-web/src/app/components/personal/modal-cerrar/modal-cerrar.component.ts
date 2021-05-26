import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { Parametro } from 'src/app/models/Parametros';
import { TicketView } from 'src/app/models/ticket';
import { AlertService } from 'src/app/services/alert.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { SessionService } from 'src/app/services/session.service';
import { TicketService } from 'src/app/services/ticket.service';
import {
  TICKET_ESTADO_CERRADO_CON_SOLUCION,
  TICKET_ESTADO_CERRADO_SIN_SOLUCION,
} from 'src/app/utils/constantes';

@Component({
  selector: 'app-modal-cerrar',
  templateUrl: './modal-cerrar.component.html',
  styleUrls: ['./modal-cerrar.component.scss'],
})
export class ModalCerrarComponent implements OnInit {
  @Input() ticket: TicketView;
  @Input() modal: NgbModalWindow;

  loading: boolean = false;
  estados: Parametro[] = [];

  cerrarForm = new FormGroup({
    ticketId: new FormControl(0, [Validators.required]),
    solucion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000),
    ]),
    estado: new FormControl('', [Validators.required]),
  });

  constructor(
    private parametroService: ParametrosService,
    private ticketService: TicketService,
    private alertService: AlertService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadValues();
    this.loadEstados();
  }

  private loadValues() {
    this.ticketId.setValue(this.ticket.ticket_id);
  }

  onSave() {
    if (!this.cerrarForm.valid) return;
    this.loading = true;
    this.ticketService.cerrarTicket(this.cerrarForm.value).subscribe((res) => {
      this.modal.dismiss('Cross click');
      this.alertService.success(
        `Cerramos el ticket #${res.ticket_id} con estado de ${res.estado.nombre}`
      );

      if (this.sessionService.isCoordinador()) {
        this.router.navigate(['/dashboard/coordinador']);
      } else {
        this.router.navigate(['/dashboard/soporte']);
      }
    });
  }

  get ticketId() {
    return this.cerrarForm.get('ticketId');
  }

  get solucion() {
    return this.cerrarForm.get('solucion');
  }

  get estado() {
    return this.cerrarForm.get('estado');
  }

  private loadEstados() {
    this.parametroService.listEstados().subscribe((res) => {
      this.estados = res.filter(this.estadoPermitido);
    });
  }

  private estadoPermitido(estado: Parametro): boolean {
    return [
      TICKET_ESTADO_CERRADO_CON_SOLUCION,
      TICKET_ESTADO_CERRADO_SIN_SOLUCION,
    ].includes(estado.parametros_id);
  }
}
