import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parametro } from 'src/app/models/Parametros';
import { AdjuntoService } from 'src/app/services/adjunto.service';
import { AlertService } from 'src/app/services/alert.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-registro-ticket',
  templateUrl: './user-registro-ticket.component.html',
  styleUrls: ['./user-registro-ticket.component.scss'],
})
export class UserRegistroTicketComponent implements OnInit {
  private personaId: number = 0;
  private catalogoId: number = 0;
  ticketId: number = 0;
  loading: boolean = false;

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
    usuarioId: new FormControl(0),
  });

  chosenFiles: File[] = [];
  progress = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private parametroService: ParametrosService,
    private ticketService: TicketService,
    private router: Router,
    private alertService: AlertService,
    private adjuntoService: AdjuntoService
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

    const idPersona = this.activeRoute.snapshot.paramMap.get('idPersona');
    if (idPersona) {
      this.personaId = parseInt(idPersona);
      this.ticketForm.get('usuarioId').setValue(idPersona);
    }

    // Loading impactos
    this.parametroService
      .listImpactos()
      .subscribe((res) => (this.impactos = res));
  }

  onSave() {
    if (!this.ticketForm.valid) return;
    this.loading = true;
    let urlRedirect = this.redirectUrl();
    // Si no tenemos el id solo registramos
    if (this.ticketId === 0) {
      this.ticketService
        .registerTicket(this.ticketForm.value)
        .subscribe((res) => {
          if (res.ticket_id) {
            this.ticketId = res.ticket_id;
            this.alertService.success(
              'Ingresamos de forma correcta el ticket.'
            );
            this.uploadFiles();
          }
        });
    } else {
      this.ticketService
        .updateTicket(this.ticketId, this.ticketForm.value)
        .subscribe((res) => {
          if (res.ticket_id) {
            this.alertService.info(
              `Actualizamos correctamente el ticket #${this.ticketId}.`
            );
            this.uploadFiles();
          }
        });
    }
  }

  private uploadFiles() {
    if (this.chosenFiles.length === 0) this.onSaved(this.redirectUrl());
    let uploads = 0;
    this.chosenFiles.forEach((file) => {
      this.upload(file);
      uploads++;
      if (uploads === this.chosenFiles.length) {
        // Esperamos un segundo para que nos devuelva el historial completo
        setTimeout(() => {
          this.onSaved(this.redirectUrl());
        }, 1000);
      }
    });
  }

  private onSaved(urlRedirect: string) {
    this.router.navigate([urlRedirect]);
    this.loading = false;
  }

  chooseFile(event): void {
    this.chosenFiles.push(event.target.files.item(0));
  }

  upload(file: File): void {
    this.progress = 0;

    this.adjuntoService.uploadFile(this.ticketId, file).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.alertService.success(
            'Subimos de forma correcta tu archvio adjunto.'
          );
        }
      },
      (error) => {
        this.progress = 0;
        this.alertService.error(
          'Error al subir tu imagen, vuelve a intentarlo.'
        );
      }
    );
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

  redirectUrl() {
    if (this.personaId === 0) {
      return this.ticketId === 0
        ? '/user/home'
        : `/user/ticket/${this.ticketId}`;
    } else {
      return `/dashboard/ticket/${this.ticketId}`;
    }
  }
}
