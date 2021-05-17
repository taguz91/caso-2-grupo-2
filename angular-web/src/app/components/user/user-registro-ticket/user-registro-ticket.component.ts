import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parametro } from 'src/app/models/Parametros';
import { ParametrosService } from 'src/app/services/parametros.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-registro-ticket',
  templateUrl: './user-registro-ticket.component.html',
  styleUrls: ['./user-registro-ticket.component.scss'],
})
export class UserRegistroTicketComponent implements OnInit {
  private catalogoId: number = 0;
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
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('idCatalogo');
    if (id) {
      this.catalogoId = parseInt(id);
      this.ticketForm.get('catalogoId').setValue(this.catalogoId);
    }
    // Loading the impactos
    this.parametroService
      .listImpactos()
      .subscribe((res) => (this.impactos = res));
  }

  onSave() {
    if (this.ticketForm.valid) {
      this.ticketService
        .registerTicket(this.ticketForm.value)
        .subscribe((res) => {
          console.log('RESPONSE', res);
          this.router.navigate(['/user/home']);
        });
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
