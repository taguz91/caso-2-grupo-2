import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parametro } from 'src/app/models/Parametros';
import { AlertService } from 'src/app/services/alert.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-registro-ticket',
  templateUrl: './user-registro-ticket.component.html',
  styleUrls: ['./user-registro-ticket.component.scss'],
})
export class UserRegistroTicketComponent implements OnInit {
  private catalogoId: number = 0;
  ticketId: number = 0;

  impactos: Parametro[] = [];

  ticketForm = new FormGroup({
    titulo: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    catalogoId: new FormControl(this.catalogoId, [Validators.required]),
    impactoId: new FormControl('', [Validators.required]),
  });

  constructor(
    private activeRoute: ActivatedRoute,
    private parametroService: ParametrosService,
    private ticketService: TicketService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('idCatalogo');
    if (id) {
      this.catalogoId = parseInt(id);
      this.ticketForm.get('catalogoId').setValue(this.catalogoId);
    }
    const idTicket = this.activeRoute.snapshot.paramMap.get('idTicket');
    if (idTicket) {
      this.ticketId = parseInt(idTicket);
      this.ticketService.one(this.ticketId).subscribe((res) => {
        this.titulo.setValue(res.titulo);
        this.descripcion.setValue(res.descripcion);
        this.impactoId.setValue(res.impacto.parametros_id);
      });
    }
    // Loading impactos
    this.parametroService
      .listImpactos()
      .subscribe((res) => (this.impactos = res));
  }

  onSave() {
    if (this.ticketForm.valid) {
      // Si no tenemos el id solo registramos
      if (this.ticketId === 0) {
        this.ticketService
          .registerTicket(this.ticketForm.value)
          .subscribe((res) => {
            console.log('RESPONSE', res);
            this.alertService.success(
              'Ingresamos de forma correcta el ticket.'
            );
            this.router.navigate(['/user/home']);
          });
      } else {
        this.ticketService
          .updateTicket(this.ticketId, this.ticketForm.value)
          .subscribe((res) => {
            console.log('RESPONSE', res);
            if (res.ticket_id) {
              this.alertService.info(
                `Actualizamos correctamente el ticket #${this.ticketId}.`
              );
              this.router.navigate([`/user/ticket/${this.ticketId}`]);
            }
          });
      }
    }
  }

  get titulo() {
    return this.ticketForm.get('titulo');
  }

  get descripcion() {
    return this.ticketForm.get('descripcion');
  }

  get impactoId() {
    return this.ticketForm.get('impactoId');
  }
}
