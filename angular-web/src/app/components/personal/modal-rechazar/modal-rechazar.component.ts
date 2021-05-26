import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { TicketView } from 'src/app/models/ticket';
import { AlertService } from 'src/app/services/alert.service';
import { SessionService } from 'src/app/services/session.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-modal-rechazar',
  templateUrl: './modal-rechazar.component.html',
  styleUrls: ['./modal-rechazar.component.scss'],
})
export class ModalRechazarComponent implements OnInit {
  @Input() ticket: TicketView;
  @Input() modal: NgbModalWindow;

  loading: boolean = false;

  rechazarForm = new FormGroup({
    ticketId: new FormControl(0, [Validators.required]),
    motivo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000),
    ]),
  });

  constructor(
    private ticketService: TicketService,
    private alertService: AlertService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketId.setValue(this.ticket.ticket_id);
  }

  onSave() {
    if (!this.rechazarForm.valid) return;
    this.loading = true;
    this.ticketService
      .rechazarTicket(this.rechazarForm.value)
      .subscribe((res) => {
        this.modal.dismiss('Cross click');
        this.alertService.info(`Rechazamos el ticket #${res.ticket_id}`);

        if (this.sessionService.isCoordinador()) {
          this.router.navigate(['/dashboard/coordinador']);
        } else {
          this.router.navigate(['/dashboard/soporte']);
        }
      });
  }

  get ticketId() {
    return this.rechazarForm.get('ticketId');
  }

  get motivo() {
    return this.rechazarForm.get('motivo');
  }
}
