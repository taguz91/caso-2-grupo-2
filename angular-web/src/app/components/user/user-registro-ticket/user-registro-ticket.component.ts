import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parametro } from 'src/app/models/Parametros';
import { TicketView } from 'src/app/models/ticket';
import { AdjuntoService } from 'src/app/services/adjunto.service';
import { AlertService } from 'src/app/services/alert.service';
import { MedioService } from 'src/app/services/medio.service';
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
  ticketView: TicketView;

  impactos: Parametro[] = [];
  mediosComunicacion: Parametro[] = [];
  mediosSelected: number[] = [];

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
    private adjuntoService: AdjuntoService,
    private medioService: MedioService
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
        this.ticketView = res;
        this.titulo.setValue(res.titulo);
        this.descripcion.setValue(res.descripcion);
        this.impactoId.setValue(res.impacto.parametros_id);
        res.mediosComunicacion.forEach((medio) => {
          this.mediosSelected.push(medio.medio.parametros_id);
        });
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

    // Loading medios comunicacion
    this.parametroService
      .listMediosComunicacion()
      .subscribe((res) => (this.mediosComunicacion = res));
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
            this.mediosSelected.forEach((medio) => {
              this.medioService.save({
                ticket_id: this.ticketId,
                medio_id: medio,
              });
            });
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
      (_) => {
        this.progress = 0;
        this.alertService.error(
          'Error al subir tu imagen, vuelve a intentarlo.'
        );
      }
    );
  }

  async onChangeMedio(e) {
    const select = parseInt(e.target.value);
    if (e.target.checked) {
      this.mediosSelected.push(select);
      if (this.ticketId === 0) return;
      const newMedio = await this.medioService.save({
        ticket_id: this.ticketId,
        medio_id: select,
      });
      this.ticketView.mediosComunicacion.push(newMedio);
    } else {
      let i = this.mediosSelected.indexOf(select);
      if (i === -1) return;
      this.mediosSelected.splice(i, 1);
      if (this.ticketId === 0) return;
      this.ticketView.mediosComunicacion.forEach((medio) => {
        if (medio.medio.parametros_id === select) {
          this.medioService.delete(medio.medio_id).subscribe((res) => {
            this.alertService.info(
              `Removimos ${medio.medio.nombre} de tus medio de comunicación.`
            );
          });
        }
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

  isChecket(medio: Parametro): boolean {
    return this.mediosSelected.includes(medio.parametros_id);
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
