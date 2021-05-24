import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { CriticidadCombo } from 'src/app/models/criticidad';
import { Parametro } from 'src/app/models/Parametros';
import { ServicioCombo } from 'src/app/models/servicio';
import { AlertService } from 'src/app/services/alert.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { CriticidadService } from 'src/app/services/criticidad.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-form-catalogo',
  templateUrl: './form-catalogo.component.html',
  styleUrls: ['./form-catalogo.component.scss'],
})
export class FormCatalogoComponent implements OnInit {
  @Input() modal: NgbModalWindow;

  loading: boolean = false;
  formTitle: string = 'Nuevo servicio | Catalogo';

  tiposServicio: Parametro[] = [];
  servicios: ServicioCombo[] = [];
  impactos: Parametro[] = [];
  criticidades: CriticidadCombo[] = [];
  nivelesPrioridad: Parametro[] = [];

  catalogoForm = new FormGroup({
    tipo_servicio_id: new FormControl('', [Validators.required]),
    servicio_id: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]),
    impacto: new FormControl('', [Validators.required]),
    criticidad: new FormControl('', [Validators.required]),
    nivelPrioridad: new FormControl('', [Validators.required]),
    tiempoRespuesta: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]),
    timpoSolucion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]),
    reglasEscalada: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]),
  });

  constructor(
    private parametrosService: ParametrosService,
    private criticidadService: CriticidadService,
    private servicioService: ServicioService,
    private catalogoService: CatalogoService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadCombos();
  }

  private loadCombos() {
    this.parametrosService
      .listImpactos()
      .subscribe((res) => (this.impactos = res));

    this.parametrosService
      .listNivelPrioridad()
      .subscribe((res) => (this.nivelesPrioridad = res));

    this.parametrosService
      .listTipoServicios()
      .subscribe((res) => (this.tiposServicio = res));

    this.criticidadService
      .getCombo()
      .subscribe((res) => (this.criticidades = res));

    this.servicioService.getCombo().subscribe((res) => (this.servicios = res));
  }

  onSave() {
    if (!this.catalogoForm.valid) return;
    this.loading = true;
    this.catalogoService.save(this.catalogoForm.value).subscribe((res) => {
      if (res.catalogo_id) {
        this.alertService.success(
          `Guardamos correctamente el catalogo: ${res.catalogo_id}`
        );
        this.modal.dismiss('Closed');
      }
    });
  }

  get tipo_servicio_id() {
    return this.catalogoForm.get('tipo_servicio_id');
  }

  get servicio_id() {
    return this.catalogoForm.get('servicio_id');
  }

  get descripcion() {
    return this.catalogoForm.get('descripcion');
  }

  get impacto() {
    return this.catalogoForm.get('impacto');
  }

  get criticidad() {
    return this.catalogoForm.get('criticidad');
  }

  get nivelPrioridad() {
    return this.catalogoForm.get('nivelPrioridad');
  }

  get tiempoRespuesta() {
    return this.catalogoForm.get('tiempoRespuesta');
  }

  get timpoSolucion() {
    return this.catalogoForm.get('timpoSolucion');
  }

  get reglasEscalada() {
    return this.catalogoForm.get('reglasEscalada');
  }
}
